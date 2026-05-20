import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useRenegade } from "@/context/RenegadeContext";
import { useColors } from "@/hooks/useColors";
import { clearBoardSession } from "@/store/gameSession";
import { AidId } from "@/types/game";

type ColorTokens = ReturnType<typeof useColors>;

const AIDS: { id: AidId; label: string; description: string }[] = [
  {
    id: "skip",
    label: "Skip",
    description: "Walk away. No points lost, but your turn is gone.",
  },
  {
    id: "split",
    label: "Split the Difference",
    description: "Host narrows it to two options. One's right — pick one.",
  },
  {
    id: "steal",
    label: "Steal",
    description: "When the other team misses, you get one shot to take their points.",
  },
  {
    id: "phone",
    label: "Phone Home",
    description: "Buy 30 extra seconds. Use it before time runs out.",
  },
  {
    id: "double",
    label: "Double or Nothing",
    description: "Bet 2× the points before the answer drops. Right = double. Wrong = double the penalty.",
  },
  {
    id: "veto",
    label: "Veto",
    description: "Make the other team sit out their next pick.",
  },
  {
    id: "insider",
    label: "Insider",
    description: "You see the question first. Give your team one word. One.",
  },
];

export default function TeamsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { game, saveGame } = useRenegade();

  const [activeTab, setActiveTab] = useState<1 | 2>(1);

  const [team1Name, setTeam1Name] = useState(game?.team1Name ?? "Team 1");
  const [team2Name, setTeam2Name] = useState(game?.team2Name ?? "Team 2");
  const [team1Aids, setTeam1AidsLocal] = useState<AidId[]>(game?.team1Aids ?? []);
  const [team2Aids, setTeam2AidsLocal] = useState<AidId[]>(game?.team2Aids ?? []);

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const team1Done = team1Name.trim().length > 0 && team1Aids.length === 3;
  const team2Done = team2Name.trim().length > 0 && team2Aids.length === 3;
  const canContinue = team1Done && team2Done;

  const toggleAid = useCallback((team: 1 | 2, aidId: AidId) => {
    const setter = team === 1 ? setTeam1AidsLocal : setTeam2AidsLocal;
    setter((prev) => {
      if (prev.includes(aidId)) return prev.filter((a) => a !== aidId);
      if (prev.length >= 3) return prev;
      return [...prev, aidId];
    });
  }, []);

  const handleContinue = async () => {
    if (!canContinue) return;
    const base = game ?? {
      team1Name: "Team 1",
      team2Name: "Team 2",
      team1Categories: [],
      team2Categories: [],
      team1Aids: [],
      team2Aids: [],
      numPlayers: 2,
    };
    await saveGame({
      ...base,
      team1Name: team1Name.trim(),
      team2Name: team2Name.trim(),
      team1Aids,
      team2Aids,
    });
    await clearBoardSession();
    router.push("/board" as never);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: topPad }]}>

      {/* Tab bar */}
      <View style={[styles.tabBar, { borderBottomColor: colors.border }]}>
        {([1, 2] as const).map((team) => {
          const isActive = activeTab === team;
          const isDone = team === 1 ? team1Done : team2Done;
          const teamColor = team === 1 ? colors.team1 : colors.team2;
          const label = team === 1
            ? (team1Name.trim() || "Team 1")
            : (team2Name.trim() || "Team 2");

          return (
            <Pressable
              key={team}
              testID={`tab-team${team}`}
              onPress={() => setActiveTab(team)}
              style={[
                styles.tab,
                isActive && { borderBottomColor: teamColor, borderBottomWidth: 2 },
              ]}
            >
              <View style={styles.tabInner}>
                <Text
                  style={[
                    styles.tabLabel,
                    {
                      color: isActive ? teamColor : colors.mutedForeground,
                      fontFamily: isActive ? "Inter_700Bold" : "Inter_500Medium",
                    },
                  ]}
                  numberOfLines={1}
                >
                  {label}
                </Text>
                {isDone && (
                  <View style={[styles.doneDot, { backgroundColor: teamColor }]} />
                )}
              </View>
            </Pressable>
          );
        })}
      </View>

      {/* Tab content */}
      <ScrollView
        key={activeTab}
        contentContainerStyle={[styles.scroll, { paddingBottom: bottomPad + 100 }]}
        keyboardShouldPersistTaps="handled"
      >
        <TeamSection
          teamNumber={activeTab}
          teamName={activeTab === 1 ? team1Name : team2Name}
          onChangeName={activeTab === 1 ? setTeam1Name : setTeam2Name}
          selectedAids={activeTab === 1 ? team1Aids : team2Aids}
          onToggleAid={(id) => toggleAid(activeTab, id)}
          teamColor={activeTab === 1 ? colors.team1 : colors.team2}
          colors={colors}
        />
      </ScrollView>

      {/* Footer */}
      <View
        style={[
          styles.footer,
          {
            paddingBottom: bottomPad + 16,
            backgroundColor: colors.background,
            borderTopColor: colors.border,
          },
        ]}
      >
        <Pressable
          testID="start-game-btn"
          onPress={handleContinue}
          disabled={!canContinue}
          style={({ pressed }) => [
            styles.continueBtn,
            {
              backgroundColor: canContinue ? colors.primary : colors.muted,
              opacity: canContinue ? (pressed ? 0.85 : 1) : 0.5,
            },
          ]}
        >
          <Text
            style={[
              styles.continueBtnText,
              {
                color: canContinue ? colors.primaryForeground : colors.mutedForeground,
                fontFamily: "Inter_700Bold",
              },
            ]}
          >
            Start Game
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function TeamSection({
  teamNumber,
  teamName,
  onChangeName,
  selectedAids,
  onToggleAid,
  teamColor,
  colors,
}: {
  teamNumber: 1 | 2;
  teamName: string;
  onChangeName: (name: string) => void;
  selectedAids: AidId[];
  onToggleAid: (id: AidId) => void;
  teamColor: string;
  colors: ColorTokens;
}) {
  return (
    <View style={styles.teamSection}>
      <TextInput
        testID={`team${teamNumber}-name-input`}
        value={teamName}
        onChangeText={onChangeName}
        placeholder={`Team ${teamNumber}`}
        placeholderTextColor={colors.mutedForeground}
        style={[
          styles.nameInput,
          {
            color: colors.foreground,
            backgroundColor: colors.card,
            borderColor: colors.border,
            fontFamily: "Inter_600SemiBold",
          },
        ]}
        maxLength={24}
        returnKeyType="done"
      />

      <View style={styles.aidHeader}>
        <View>
          <Text
            style={[styles.aidTitle, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}
          >
            Pick 3 Aids
          </Text>
          <Text
            style={[styles.aidSubtitle, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}
          >
            One use each — choose wisely
          </Text>
        </View>
        <Text
          style={[
            styles.aidCount,
            {
              color: selectedAids.length === 3 ? teamColor : colors.mutedForeground,
              fontFamily: "Inter_700Bold",
            },
          ]}
        >
          {selectedAids.length}/3
        </Text>
      </View>

      {AIDS.map((aid) => {
        const selected = selectedAids.includes(aid.id);
        const maxed = !selected && selectedAids.length >= 3;
        return (
          <Pressable
            key={aid.id}
            testID={`team${teamNumber}-aid-${aid.id}`}
            onPress={() => onToggleAid(aid.id)}
            style={({ pressed }) => [
              styles.aidCard,
              {
                backgroundColor: selected ? teamColor + "22" : colors.card,
                borderColor: selected ? teamColor : colors.border,
                opacity: maxed ? 0.35 : pressed ? 0.7 : 1,
              },
            ]}
          >
            <Text
              style={[
                styles.aidLabel,
                { color: selected ? teamColor : colors.foreground, fontFamily: "Inter_700Bold" },
              ]}
            >
              {aid.label}
            </Text>
            <Text
              style={[styles.aidDesc, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}
            >
              {aid.description}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabBar: {
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  tabLabel: {
    fontSize: 15,
    letterSpacing: 0.3,
  },
  doneDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  scroll: { paddingHorizontal: 20, paddingTop: 20 },
  teamSection: {},
  nameInput: {
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    marginBottom: 20,
  },
  aidHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  aidTitle: { fontSize: 14 },
  aidSubtitle: { fontSize: 11, marginTop: 2 },
  aidCount: { fontSize: 20 },
  aidCard: {
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    gap: 4,
  },
  aidLabel: { fontSize: 14 },
  aidDesc: { fontSize: 11, lineHeight: 16 },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  continueBtn: {
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  continueBtnText: { fontSize: 16, letterSpacing: 0.5 },
});
