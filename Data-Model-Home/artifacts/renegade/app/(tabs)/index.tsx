import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useRenegade } from "@/context/RenegadeContext";
import { useColors } from "@/hooks/useColors";
import { clearBoardSession } from "@/store/gameSession";
import { supabase } from "@/lib/supabase";

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { game, resetGame } = useRenegade();

  const [showIntro, setShowIntro] = useState(false);
  const [stats, setStats] = useState<{ played: number; wins: number } | null>(null);

  useEffect(() => {
    AsyncStorage.getItem("renegade:intro_seen").then((val) => {
      if (!val) setShowIntro(true);
    });
  }, []);

  useEffect(() => {
    supabase
      .from("games")
      .select("winner")
      .then(({ data }) => {
        if (!data) return;
        setStats({
          played: data.length,
          wins: data.filter((g: { winner: string }) => g.winner !== "tie").length,
        });
      })
      .catch(() => {});
  }, []);

  const dismissIntro = async () => {
    await AsyncStorage.setItem("renegade:intro_seen", "1");
    setShowIntro(false);
  };

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const gameStage = game
    ? game.team1Aids.length === 3 && game.team2Aids.length === 3
      ? "In progress — board"
      : game.team1Categories.length === 3 && game.team2Categories.length === 3
        ? "Setting up aids"
        : "Picking categories"
    : null;

  const handleNewGame = async () => {
    resetGame();
    await clearBoardSession();
    router.push("/create-game/categories");
  };

  const handleContinue = () => {
    if (!game) return;
    if (game.team1Aids.length === 3 && game.team2Aids.length === 3) {
      router.push("/board" as never);
      return;
    }
    if (game.team1Categories.length === 3 && game.team2Categories.length === 3) {
      router.push("/create-game/teams" as never);
      return;
    }
    router.push("/create-game/categories");
  };

  const handleSettings = () => {
    router.push("/settings");
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          paddingTop: topPad + 24,
          paddingBottom: bottomPad + 16,
        },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            { color: colors.primary, fontFamily: "Inter_700Bold" },
          ]}
        >
          RENEGADE
        </Text>
        <Text
          style={[
            styles.tagline,
            { color: colors.mutedForeground, fontFamily: "Inter_400Regular" },
          ]}
        >
          Two teams. Six categories. No mercy.
        </Text>
      </View>

      {/* Stats bar */}
      {stats !== null && stats.played > 0 && (
        <View style={[styles.statsBar, { borderColor: colors.border }]}>
          <Text style={[styles.statItem, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
            <Text style={[styles.statNum, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
              {stats.played}
            </Text>
            {" games"}
          </Text>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <Text style={[styles.statItem, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
            <Text style={[styles.statNum, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
              {stats.wins}
            </Text>
            {" wins"}
          </Text>
        </View>
      )}

      {/* In-progress game card */}
      {game && gameStage && (
        <View
          style={[
            styles.gameCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View style={styles.gameCardTeams}>
            <View style={styles.teamChip}>
              <View
                style={[styles.teamDot, { backgroundColor: colors.team1 }]}
              />
              <Text
                style={[
                  styles.teamName,
                  { color: colors.team1, fontFamily: "Inter_600SemiBold" },
                ]}
                numberOfLines={1}
              >
                {game.team1Name}
              </Text>
            </View>
            <Text
              style={[
                styles.vsText,
                {
                  color: colors.mutedForeground,
                  fontFamily: "Inter_400Regular",
                },
              ]}
            >
              vs
            </Text>
            <View style={[styles.teamChip, styles.teamChipRight]}>
              <Text
                style={[
                  styles.teamName,
                  { color: colors.team2, fontFamily: "Inter_600SemiBold" },
                ]}
                numberOfLines={1}
              >
                {game.team2Name}
              </Text>
              <View
                style={[styles.teamDot, { backgroundColor: colors.team2 }]}
              />
            </View>
          </View>
          <Text
            style={[
              styles.gameStage,
              {
                color: colors.mutedForeground,
                fontFamily: "Inter_400Regular",
              },
            ]}
          >
            {gameStage}
          </Text>
        </View>
      )}

      {/* Actions */}
      <View style={styles.actions}>
        <Pressable
          testID="new-game-btn"
          onPress={handleNewGame}
          style={({ pressed }) => [
            styles.btn,
            styles.btnPrimary,
            { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
          ]}
        >
          <Text
            style={[
              styles.btnText,
              {
                color: colors.primaryForeground,
                fontFamily: "Inter_700Bold",
              },
            ]}
          >
            New Game
          </Text>
        </Pressable>

        {game && (
          <Pressable
            testID="continue-game-btn"
            onPress={handleContinue}
            style={({ pressed }) => [
              styles.btn,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderWidth: 1,
                opacity: pressed ? 0.75 : 1,
              },
            ]}
          >
            <Text
              style={[
                styles.btnText,
                { color: colors.foreground, fontFamily: "Inter_600SemiBold" },
              ]}
            >
              Continue Game
            </Text>
          </Pressable>
        )}

        <Pressable
          testID="settings-btn"
          onPress={handleSettings}
          style={({ pressed }) => [
            styles.btn,
            {
              backgroundColor: "transparent",
              opacity: pressed ? 0.6 : 1,
            },
          ]}
        >
          <Text
            style={[
              styles.btnText,
              {
                color: colors.mutedForeground,
                fontFamily: "Inter_500Medium",
              },
            ]}
          >
            Settings
          </Text>
        </Pressable>
      </View>

      {/* Footer */}
      <Text
        style={[
          styles.version,
          { color: colors.mutedForeground, fontFamily: "Inter_400Regular" },
        ]}
      >
        Renegade v0.1.0
      </Text>

      {/* First-launch intro */}
      <Modal visible={showIntro} transparent animationType="fade" statusBarTranslucent>
        <View style={[styles.introOverlay, { backgroundColor: colors.background }]}>
          <Text style={[styles.introTitle, { color: colors.primary, fontFamily: "Inter_700Bold" }]}>
            RENEGADE
          </Text>
          <Text style={[styles.introSub, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
            Two teams. Six categories. No mercy.
          </Text>
          <View style={styles.introRules}>
            {[
              { n: "1", text: "Each team picks 3 topic categories — you pick yours, you pick theirs." },
              { n: "2", text: "Questions run 200 → 400 → 600. None of them are softballs." },
              { n: "3", text: "Before the game, each team picks 3 Aids. One use each. Choose wisely." },
              { n: "4", text: "Clear the board. Most points wins." },
            ].map(({ n, text }) => (
              <View key={n} style={styles.introRule}>
                <Text style={[styles.introBullet, { color: colors.primary, fontFamily: "Inter_700Bold" }]}>
                  {n}
                </Text>
                <Text style={[styles.introRuleText, { color: colors.foreground, fontFamily: "Inter_400Regular" }]}>
                  {text}
                </Text>
              </View>
            ))}
          </View>
          <Pressable
            onPress={dismissIntro}
            style={({ pressed }) => [
              styles.introBtn,
              { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
            ]}
          >
            <Text style={[styles.introBtnText, { color: "#fff", fontFamily: "Inter_700Bold" }]}>
              Let's go
            </Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },

  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  title: {
    fontSize: 48,
    letterSpacing: 8,
  },
  tagline: {
    fontSize: 15,
    letterSpacing: 1,
  },

  statsBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 16,
  },
  statItem: { fontSize: 13 },
  statNum: { fontSize: 15 },
  statDivider: { width: 1, height: 14 },

  gameCard: {
    width: "100%",
    paddingHorizontal: 32,
    marginBottom: 28,
    paddingVertical: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 6,
    alignItems: "center",
  },
  gameCardTeams: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    width: "100%",
    justifyContent: "center",
  },
  teamChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
  },
  teamChipRight: {
    justifyContent: "flex-end",
  },
  teamDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    flexShrink: 0,
  },
  teamName: {
    fontSize: 14,
    flexShrink: 1,
  },
  vsText: {
    fontSize: 12,
    flexShrink: 0,
  },
  gameStage: {
    fontSize: 11,
    letterSpacing: 0.3,
  },

  actions: {
    width: "100%",
    paddingHorizontal: 32,
    gap: 14,
    marginBottom: 24,
  },
  btn: {
    width: "100%",
    height: 56,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  btnPrimary: {
    shadowColor: "#E53935",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  btnText: {
    fontSize: 16,
    letterSpacing: 0.5,
  },

  version: {
    fontSize: 11,
    letterSpacing: 0.3,
  },

  introOverlay: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  introTitle: {
    fontSize: 42,
    letterSpacing: 8,
    textAlign: "center",
    marginBottom: 10,
  },
  introSub: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 44,
    letterSpacing: 0.3,
  },
  introRules: {
    gap: 22,
    marginBottom: 52,
  },
  introRule: {
    flexDirection: "row",
    gap: 14,
    alignItems: "flex-start",
  },
  introBullet: {
    fontSize: 17,
    width: 22,
    textAlign: "center",
    lineHeight: 22,
  },
  introRuleText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
  },
  introBtn: {
    height: 56,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  introBtnText: {
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
