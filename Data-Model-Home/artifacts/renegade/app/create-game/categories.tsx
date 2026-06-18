import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
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

import * as Haptics from "expo-haptics";

import CATEGORIES from "@/constants/categories";
import { useRenegade } from "@/context/RenegadeContext";
import { useColors } from "@/hooks/useColors";
import { clearBoardSession } from "@/store/gameSession";
import { Category, GameConfig } from "@/types/game";

type Team = "team1" | "team2";
type ColorTokens = ReturnType<typeof useColors>;

export default function CategoriesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { game, saveGame } = useRenegade();

  const [team1Picks, setTeam1Picks] = useState<string[]>([]);
  const [team2Picks, setTeam2Picks] = useState<string[]>([]);
  const [currentTurn, setCurrentTurn] = useState<Team>("team1");
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(() => new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const isDone = team1Picks.length === 3 && team2Picks.length === 3;
  const canContinue = isDone;

  const team1Name = game?.team1Name ?? "Team 1";
  const team2Name = game?.team2Name ?? "Team 2";
  const currentTeamName = currentTurn === "team1" ? team1Name : team2Name;
  const currentColor = currentTurn === "team1" ? colors.team1 : colors.team2;

  const currentPickNumber =
    (currentTurn === "team1" ? team1Picks.length : team2Picks.length) + 1;

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return null;
    return CATEGORIES.filter(
      (cat) =>
        cat.name.toLowerCase().includes(q) ||
        cat.group?.toLowerCase().includes(q) ||
        cat.description.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  // Derive groups + ungrouped lists
  const { groupedCategories, ungroupedCategories, groupOrder } = useMemo(() => {
    const groups: Record<string, Category[]> = {};
    const ungrouped: Category[] = [];
    const order: string[] = [];

    for (const cat of CATEGORIES) {
      if (cat.group) {
        if (!groups[cat.group]) {
          groups[cat.group] = [];
          order.push(cat.group);
        }
        groups[cat.group].push(cat);
      } else {
        ungrouped.push(cat);
      }
    }

    return {
      groupedCategories: groups,
      ungroupedCategories: ungrouped,
      groupOrder: order,
    };
  }, []);

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(group)) next.delete(group);
      else next.add(group);
      return next;
    });
  };

  const handleTap = (categoryId: string) => {
    // Empty ("Coming soon") categories are not selectable — picking one would
    // produce a dead board column ("No questions loaded yet…").
    const cat = CATEGORIES.find((c) => c.id === categoryId);
    if (!cat || cat.questions.length === 0) return;

    Haptics.selectionAsync();
    const ownedBy1 = team1Picks.includes(categoryId);
    const ownedBy2 = team2Picks.includes(categoryId);

    if (ownedBy1) {
      setTeam1Picks((prev) => prev.filter((id) => id !== categoryId));
      setCurrentTurn("team1");
      return;
    }
    if (ownedBy2) {
      setTeam2Picks((prev) => prev.filter((id) => id !== categoryId));
      setCurrentTurn("team2");
      return;
    }

    // New pick — must be current team's turn and under their limit
    if (isDone) return;

    if (currentTurn === "team1" && team1Picks.length < 3) {
      setTeam1Picks((prev) => [...prev, categoryId]);
      setCurrentTurn("team2");
    } else if (currentTurn === "team2" && team2Picks.length < 3) {
      setTeam2Picks((prev) => [...prev, categoryId]);
      setCurrentTurn("team1");
    }
  };

  const handleContinue = async () => {
    if (!canContinue) return;
    const config: GameConfig = {
      team1Name: game?.team1Name ?? "Team 1",
      team2Name: game?.team2Name ?? "Team 2",
      team1Categories: team1Picks,
      team2Categories: team2Picks,
      team1Aids: game?.team1Aids ?? [],
      team2Aids: game?.team2Aids ?? [],
      numPlayers: game?.numPlayers ?? 2,
    };
    await saveGame(config);
    await clearBoardSession();
    router.push("/create-game/teams" as never);
  };

  const renderCard = (cat: Category) => {
    const ownedBy1 = team1Picks.includes(cat.id);
    const ownedBy2 = team2Picks.includes(cat.id);
    const picked = ownedBy1 || ownedBy2;
    const teamColor = ownedBy1
      ? colors.team1
      : ownedBy2
        ? colors.team2
        : colors.border;
    const noQuestions = cat.questions.length === 0;

    return (
      <Pressable
        key={cat.id}
        testID={`category-${cat.id}`}
        onPress={() => handleTap(cat.id)}
        style={({ pressed }) => [
          styles.card,
          {
            backgroundColor: picked ? teamColor + "22" : colors.card,
            borderColor: picked ? teamColor : colors.border,
            opacity: noQuestions ? 0.45 : pressed ? 0.75 : 1,
          },
        ]}
      >
        {cat.imageUrl ? (
          <Image
            source={{ uri: cat.imageUrl }}
            style={styles.cardImage}
            contentFit="cover"
            transition={200}
          />
        ) : null}
        <View style={styles.cardBody}>
          <Text
            style={[
              styles.cardName,
              {
                color: picked ? teamColor : colors.foreground,
                fontFamily: "Inter_700Bold",
              },
            ]}
            numberOfLines={2}
          >
            {cat.name}
          </Text>
          {picked && (
            <Text
              style={[
                styles.cardHint,
                { color: teamColor, fontFamily: "Inter_400Regular" },
              ]}
            >
              Tap to remove
            </Text>
          )}
          {!picked && noQuestions && (
            <Text
              style={[
                styles.cardHint,
                { color: colors.mutedForeground, fontFamily: "Inter_400Regular" },
              ]}
            >
              Coming soon
            </Text>
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background, paddingTop: topPad },
      ]}
    >
      {/* Header */}
      <View style={[styles.topBar, { borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} hitSlop={12} style={styles.backBtn}>
          <Text style={[styles.backLabel, { color: colors.mutedForeground, fontFamily: "Inter_500Medium" }]}>
            ← Back
          </Text>
        </Pressable>

        {isDone ? (
          <Text
            style={[
              styles.turnLabel,
              { color: colors.mutedForeground, fontFamily: "Inter_600SemiBold" },
            ]}
            numberOfLines={1}
          >
            Board is set.
          </Text>
        ) : (
          <View style={styles.turnInfo}>
            <View style={[styles.turnDot, { backgroundColor: currentColor }]} />
            <Text
              style={[
                styles.turnLabel,
                { color: colors.foreground, fontFamily: "Inter_600SemiBold" },
              ]}
              numberOfLines={1}
            >
              <Text style={{ color: currentColor }}>{currentTeamName}</Text>
              {" · pick #"}
              {currentPickNumber}
            </Text>
          </View>
        )}
      </View>

      {/* Team pick counters */}
      <View style={styles.teamRow}>
        <TeamBadge
          name={team1Name}
          count={team1Picks.length}
          color={colors.team1}
          colors={colors}
        />
        <TeamBadge
          name={team2Name}
          count={team2Picks.length}
          color={colors.team2}
          colors={colors}
        />
      </View>

      {/* Instruction */}
      <Text
        style={[
          styles.instruction,
          { color: colors.mutedForeground, fontFamily: "Inter_400Regular" },
        ]}
      >
        Tap to pick · tap again to remove
      </Text>

      {/* Search */}
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search categories…"
        placeholderTextColor={colors.mutedForeground}
        style={[
          styles.searchInput,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            color: colors.foreground,
            fontFamily: "Inter_400Regular",
          },
        ]}
        returnKeyType="search"
        clearButtonMode="while-editing"
        autoCorrect={false}
      />

      {/* Category list */}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: bottomPad + 100 },
        ]}
      >
        {/* Search results (flat list, bypasses accordion) */}
        {searchResults !== null && (
          <View style={styles.section}>
            {searchResults.length === 0 ? (
              <Text style={[styles.instruction, { color: colors.mutedForeground, fontFamily: "Inter_400Regular", textAlign: "center", paddingTop: 24 }]}>
                No categories found.
              </Text>
            ) : (
              <View style={styles.cardGrid}>
                {searchResults.map((cat) => renderCard(cat))}
              </View>
            )}
          </View>
        )}

        {/* Normal grouped view (hidden while searching) */}
        {searchResults === null && ungroupedCategories.length > 0 && (
          <View style={styles.section}>
            <View style={styles.cardGrid}>
              {ungroupedCategories.map((cat) => renderCard(cat))}
            </View>
          </View>
        )}

        {/* Grouped categories (accordion) */}
        {searchResults === null && groupOrder.map((group) => {
          const cats = groupedCategories[group] ?? [];
          const expanded = expandedGroups.has(group);
          const groupPickCount = cats.filter(
            (c) =>
              team1Picks.includes(c.id) || team2Picks.includes(c.id),
          ).length;

          return (
            <View key={group} style={styles.section}>
              <Pressable
                onPress={() => toggleGroup(group)}
                style={({ pressed }) => [
                  styles.groupHeader,
                  {
                    borderBottomColor: colors.border,
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <View style={styles.groupHeaderLeft}>
                  <Text
                    style={[
                      styles.groupName,
                      {
                        color: colors.foreground,
                        fontFamily: "Inter_700Bold",
                      },
                    ]}
                  >
                    {group}
                  </Text>
                  {groupPickCount > 0 && (
                    <View
                      style={[
                        styles.groupBadge,
                        { backgroundColor: colors.primary + "33" },
                      ]}
                    >
                      <Text
                        style={[
                          styles.groupBadgeText,
                          {
                            color: colors.primary,
                            fontFamily: "Inter_600SemiBold",
                          },
                        ]}
                      >
                        {groupPickCount}
                      </Text>
                    </View>
                  )}
                </View>
                <Text
                  style={[
                    styles.chevron,
                    { color: colors.mutedForeground, fontFamily: "Inter_400Regular" },
                  ]}
                >
                  {expanded ? "▲" : "▼"}
                </Text>
              </Pressable>

              {expanded && (
                <View style={styles.cardGrid}>
                  {cats.map((cat) => renderCard(cat))}
                </View>
              )}
            </View>
          );
        })}
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
          testID="continue-btn"
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
                color: canContinue
                  ? colors.primaryForeground
                  : colors.mutedForeground,
                fontFamily: "Inter_700Bold",
              },
            ]}
          >
            Continue
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function TeamBadge({
  name,
  count,
  color,
  colors,
}: {
  name: string;
  count: number;
  color: string;
  colors: ColorTokens;
}) {
  return (
    <View style={[styles.teamBadge, { borderColor: color }]}>
      <Text
        style={[
          styles.teamBadgeText,
          { color, fontFamily: "Inter_600SemiBold" },
        ]}
        numberOfLines={1}
      >
        {name}: {count}/3
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    gap: 8,
  },
  backBtn: { minWidth: 56 },
  backLabel: { fontSize: 14 },
  turnInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  turnDot: { width: 9, height: 9, borderRadius: 4.5 },
  turnLabel: { fontSize: 15, flex: 1 },

  teamRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 2,
    gap: 10,
  },
  teamBadge: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  teamBadgeText: { fontSize: 13 },

  instruction: {
    fontSize: 11,
    paddingHorizontal: 20,
    paddingVertical: 6,
    letterSpacing: 0.2,
  },

  searchInput: {
    marginHorizontal: 14,
    marginVertical: 8,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 14,
  },

  scroll: { paddingHorizontal: 14, paddingTop: 6 },

  section: { marginBottom: 18 },

  sectionLabel: {
    fontSize: 11,
    letterSpacing: 1,
    marginBottom: 8,
    paddingHorizontal: 2,
  },

  groupHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 8,
  },
  groupHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  groupName: { fontSize: 16 },
  groupBadge: {
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  groupBadgeText: { fontSize: 12 },
  chevron: { fontSize: 13 },

  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  card: {
    width: "48%",
    borderWidth: 1.5,
    borderRadius: 12,
    overflow: "hidden",
    minHeight: 68,
  },
  cardImage: {
    width: "100%",
    height: 80,
  },
  cardBody: {
    padding: 10,
    gap: 4,
  },
  cardName: { fontSize: 13, lineHeight: 18 },
  cardHint: { fontSize: 10, lineHeight: 14 },

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
