import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import * as Haptics from "expo-haptics";

import CATEGORIES from "@/constants/categories";
import { useRenegade } from "@/context/RenegadeContext";
import { useColors } from "@/hooks/useColors";
import {
  BoardSession,
  TeamKey,
  Tier,
  TileStatus,
  consumePendingResult,
  createEmptyBoardSession,
  getUsedAidsSnapshot,
  hydrateUsedAids,
  hydrateSeenQuestions,
  loadBoardSession,
  saveBoardSession,
  tileKey,
} from "@/store/gameSession";
import { fetchSeenQuestionIds } from "@/store/seenQuestions";

const TIERS = [200, 400, 600] as const;
const SLOT_INDEXES = [0, 1] as const;
const TIER_SLOTS = TIERS.flatMap((tier) =>
  SLOT_INDEXES.map((slotIndex) => ({ tier, slotIndex })),
);

type ColorTokens = ReturnType<typeof useColors>;
type CategoryData = (typeof CATEGORIES)[number];

function otherTeam(team: TeamKey): TeamKey {
  return team === "team1" ? "team2" : "team1";
}

function nextTurnAfter(currentTurn: TeamKey, skipTurnFor?: TeamKey): TeamKey {
  const nextTurn = otherTeam(currentTurn);
  return nextTurn === skipTurnFor ? otherTeam(nextTurn) : nextTurn;
}

export default function BoardScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { game } = useRenegade();

  const [session, setSession] = useState<BoardSession | null>(null);

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  useEffect(() => {
    if (!game) {
      router.replace("/");
      return;
    }

    let active = true;
    Promise.all([loadBoardSession(), fetchSeenQuestionIds()]).then(
      ([saved, seenIds]) => {
        if (!active) return;
        const next = saved ?? createEmptyBoardSession();
        hydrateUsedAids(next);
        hydrateSeenQuestions(seenIds);
        setSession(next);
        if (!saved) saveBoardSession(next).catch(console.error);
      },
    );

    return () => {
      active = false;
    };
  }, [game, router]);

  const updateSession = useCallback((updater: (prev: BoardSession) => BoardSession) => {
    setSession((prev) => {
      const next = updater(prev ?? createEmptyBoardSession());
      hydrateUsedAids(next);
      saveBoardSession(next).catch(console.error);
      return next;
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      const result = consumePendingResult();
      if (!result) return;

      updateSession((prev) => {
        const key = tileKey(result.categoryId, result.tier, result.slotIndex);
        const anyoneScored =
          result.team1ScoreDelta > 0 || result.team2ScoreDelta > 0;

        return {
          ...prev,
          tileStatuses: {
            ...prev.tileStatuses,
            [key]: anyoneScored ? "played_won" : "played_lost",
          },
          team1Score: prev.team1Score + result.team1ScoreDelta,
          team2Score: prev.team2Score + result.team2ScoreDelta,
          currentTurn: nextTurnAfter(prev.currentTurn, result.skipTurnFor),
          usedAids: getUsedAidsSnapshot(),
        };
      });
    }, [updateSession]),
  );

  const categoryLookup = useMemo(
    () => Object.fromEntries(CATEGORIES.map((category) => [category.id, category])),
    [],
  );

  if (!game || !session) return null;

  const team1Cats = game.team1Categories
    .map((id) => categoryLookup[id])
    .filter((category): category is CategoryData => !!category);

  const team2Cats = game.team2Categories
    .map((id) => categoryLookup[id])
    .filter((category): category is CategoryData => !!category);

  const totalTiles =
    (game.team1Categories.length + game.team2Categories.length) *
    TIERS.length *
    SLOT_INDEXES.length;
  const allPlayed = Object.keys(session.tileStatuses).length >= totalTiles;

  const handleTileTap = (categoryId: string, tier: Tier, slotIndex: number) => {
    const key = tileKey(categoryId, tier, slotIndex);
    if (session.tileStatuses[key]) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({
      pathname: "/question" as never,
      params: {
        categoryId,
        tier: String(tier),
        slotIndex: String(slotIndex),
        currentTurn: session.currentTurn,
        questionSeed: String(session.questionSeed ?? 0),
      },
    });
  };

  const currentColor =
    session.currentTurn === "team1" ? colors.team1 : colors.team2;
  const currentName =
    session.currentTurn === "team1" ? game.team1Name : game.team2Name;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background, paddingTop: topPad },
      ]}
    >
      <View style={[styles.scoreBar, { borderBottomColor: colors.border }]}>
        <ScoreBlock
          name={game.team1Name}
          score={session.team1Score}
          align="left"
          color={colors.team1}
        />

        <View style={styles.turnBlock}>
          <View style={[styles.turnDot, { backgroundColor: currentColor }]} />
          <Text
            style={[
              styles.turnText,
              { color: colors.mutedForeground, fontFamily: "Inter_500Medium" },
            ]}
            numberOfLines={1}
          >
            {currentName} picks
          </Text>
        </View>

        <ScoreBlock
          name={game.team2Name}
          score={session.team2Score}
          align="right"
          color={colors.team2}
        />
      </View>

      <View style={[styles.tierHeaderRow, { borderBottomColor: colors.border }]}>
        <View style={styles.catNameCol} />
        {TIER_SLOTS.map(({ tier, slotIndex }) => (
          <View key={`${tier}-${slotIndex}`} style={styles.tileCol}>
            <Text
              style={[
                styles.tierHeaderText,
                { color: colors.mutedForeground, fontFamily: "Inter_600SemiBold" },
              ]}
            >
              {tier}
            </Text>
          </View>
        ))}
      </View>

      <ScrollView
        style={styles.grid}
        contentContainerStyle={{ paddingBottom: bottomPad + (allPlayed ? 96 : 24) }}
      >
        {team1Cats.map((category) => (
          <CategoryRow
            key={category.id}
            category={category}
            teamColor={colors.team1}
            currentTurnColor={currentColor}
            tileStatuses={session.tileStatuses}
            onTap={handleTileTap}
            colors={colors}
          />
        ))}

        <View style={[styles.teamDivider, { backgroundColor: colors.border }]} />

        {team2Cats.map((category) => (
          <CategoryRow
            key={category.id}
            category={category}
            teamColor={colors.team2}
            currentTurnColor={currentColor}
            tileStatuses={session.tileStatuses}
            onTap={handleTileTap}
            colors={colors}
          />
        ))}
      </ScrollView>

      {allPlayed && (
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
            testID="see-results-btn"
            onPress={() =>
              router.push({
                pathname: "/results" as never,
                params: {
                  team1Score: String(session.team1Score),
                  team2Score: String(session.team2Score),
                },
              })
            }
            style={({ pressed }) => [
              styles.resultsBtn,
              { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
            ]}
          >
            <Text
              style={[
                styles.resultsBtnText,
                { color: colors.primaryForeground, fontFamily: "Inter_700Bold" },
              ]}
            >
              See Results
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

function ScoreBlock({
  name,
  score,
  align,
  color,
}: {
  name: string;
  score: number;
  align: "left" | "right";
  color: string;
}) {
  return (
    <View style={[styles.scoreBlock, align === "right" && styles.scoreBlockRight]}>
      <Text
        style={[styles.teamNameText, { color, fontFamily: "Inter_700Bold" }]}
        numberOfLines={1}
      >
        {name}
      </Text>
      <Text style={[styles.scoreText, { color, fontFamily: "Inter_700Bold" }]}>
        {score}
      </Text>
    </View>
  );
}

function CategoryRow({
  category,
  teamColor,
  currentTurnColor,
  tileStatuses,
  onTap,
  colors,
}: {
  category: CategoryData;
  teamColor: string;
  currentTurnColor: string;
  tileStatuses: Record<string, TileStatus>;
  onTap: (categoryId: string, tier: Tier, slotIndex: number) => void;
  colors: ColorTokens;
}) {
  return (
    <View style={[styles.row, { borderBottomColor: colors.border }]}>
      <View
        style={[
          styles.catNameCol,
          styles.catNameCell,
          { borderLeftColor: teamColor },
        ]}
      >
        <Text
          style={[
            styles.catNameText,
            { color: colors.foreground, fontFamily: "Inter_600SemiBold" },
          ]}
          numberOfLines={2}
        >
          {category.name}
        </Text>
      </View>

      {TIER_SLOTS.map(({ tier, slotIndex }) => {
        const key = tileKey(category.id, tier, slotIndex);
        const status = tileStatuses[key];
        const played = !!status;

        let bgColor = colors.card;
        let fgColor = currentTurnColor;
        let label = String(tier);

        if (status === "played_won") {
          bgColor = teamColor + "33";
          fgColor = teamColor;
          label = "Done";
        } else if (status === "played_lost") {
          bgColor = colors.muted;
          fgColor = colors.mutedForeground;
          label = "Miss";
        }

        return (
          <Pressable
            key={key}
            testID={`tile-${category.id}-${tier}-${slotIndex}`}
            onPress={() => onTap(category.id, tier, slotIndex)}
            disabled={played}
            style={({ pressed }) => [
              styles.tileCol,
              styles.tile,
              {
                backgroundColor: bgColor,
                borderColor: played ? "transparent" : colors.border,
                opacity: played ? 0.55 : pressed ? 0.65 : 1,
              },
            ]}
          >
            <Text
              style={[
                styles.tileText,
                { color: fgColor, fontFamily: "Inter_700Bold" },
              ]}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scoreBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  scoreBlock: { flex: 2 },
  scoreBlockRight: { alignItems: "flex-end" },
  teamNameText: { fontSize: 11, letterSpacing: 0.3 },
  scoreText: { fontSize: 36, letterSpacing: 0.5, marginTop: 1 },
  turnBlock: {
    flex: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  turnDot: { width: 8, height: 8, borderRadius: 4 },
  turnText: { fontSize: 13 },
  tierHeaderRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  tierHeaderText: { fontSize: 9, letterSpacing: 0.3 },
  grid: { flex: 1 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 8,
    paddingHorizontal: 8,
    minHeight: 66,
  },
  catNameCol: { flex: 4 },
  tileCol: { flex: 1.6, alignItems: "center" },
  catNameCell: {
    borderLeftWidth: 3,
    paddingLeft: 8,
    paddingRight: 6,
  },
  catNameText: { fontSize: 12, lineHeight: 16 },
  tile: {
    height: 52,
    marginHorizontal: 2,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tileText: { fontSize: 12, letterSpacing: 0.2 },
  teamDivider: { height: 2 },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  resultsBtn: {
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  resultsBtnText: { fontSize: 16, letterSpacing: 0.5 },
});
