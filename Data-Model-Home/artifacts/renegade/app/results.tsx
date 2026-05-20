import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
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
import { recordGame } from "@/store/games";

export default function ResultsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { game, resetGame } = useRenegade();

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const { team1Score: t1Param, team2Score: t2Param } = useLocalSearchParams<{
    team1Score: string;
    team2Score: string;
  }>();

  const team1Score = Number(t1Param ?? 0);
  const team2Score = Number(t2Param ?? 0);

  const team1Name = game?.team1Name ?? "Team 1";
  const team2Name = game?.team2Name ?? "Team 2";

  const winner: "team1" | "team2" | "tie" =
    team1Score > team2Score
      ? "team1"
      : team2Score > team1Score
        ? "team2"
        : "tie";

  const winnerName =
    winner === "team1" ? team1Name : winner === "team2" ? team2Name : null;

  const winnerColor =
    winner === "team1"
      ? colors.team1
      : winner === "team2"
        ? colors.team2
        : colors.mutedForeground;

  const recorded = useRef(false);
  useEffect(() => {
    if (recorded.current) return;
    recorded.current = true;
    recordGame({
      team1Name,
      team2Name,
      team1Score,
      team2Score,
      winner,
      categories: [
        ...(game?.team1Categories ?? []),
        ...(game?.team2Categories ?? []),
      ],
    });
  }, []);

  const handlePlayAgain = async () => {
    // Keep team names + aids, just re-pick categories
    await clearBoardSession();
    router.replace("/create-game/categories" as never);
  };

  const handleNewGame = async () => {
    resetGame();
    await clearBoardSession();
    router.replace("/" as never);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background, paddingTop: topPad },
      ]}
    >
      {/* Winner banner */}
      <View style={styles.bannerSection}>
        {winner === "tie" ? (
          <>
            <Text
              style={[
                styles.outcomeLabel,
                { color: colors.mutedForeground, fontFamily: "Inter_600SemiBold" },
              ]}
            >
              IT&apos;S A TIE
            </Text>
            <Text
              style={[
                styles.tieText,
                { color: colors.foreground, fontFamily: "Inter_700Bold" },
              ]}
            >
              Well played, both teams.
            </Text>
          </>
        ) : (
          <>
            <Text
              style={[
                styles.outcomeLabel,
                { color: winnerColor, fontFamily: "Inter_600SemiBold" },
              ]}
            >
              WINNER
            </Text>
            <Text
              style={[
                styles.winnerName,
                { color: winnerColor, fontFamily: "Inter_700Bold" },
              ]}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {winnerName}
            </Text>
          </>
        )}
      </View>

      {/* Score cards */}
      <View style={styles.scoreRow}>
        <ScoreCard
          name={team1Name}
          score={team1Score}
          teamColor={colors.team1}
          isWinner={winner === "team1"}
          colors={colors}
        />
        <View style={[styles.vsDivider, { backgroundColor: colors.border }]} />
        <ScoreCard
          name={team2Name}
          score={team2Score}
          teamColor={colors.team2}
          isWinner={winner === "team2"}
          colors={colors}
        />
      </View>

      {/* Spacer */}
      <View style={styles.spacer} />

      {/* Actions */}
      <View
        style={[
          styles.footer,
          {
            paddingBottom: bottomPad + 16,
            borderTopColor: colors.border,
            backgroundColor: colors.background,
          },
        ]}
      >
        <Pressable
          testID="play-again-btn"
          onPress={handlePlayAgain}
          style={({ pressed }) => [
            styles.primaryBtn,
            {
              backgroundColor: colors.primary,
              opacity: pressed ? 0.85 : 1,
            },
          ]}
        >
          <Text
            style={[
              styles.primaryBtnText,
              {
                color: colors.primaryForeground,
                fontFamily: "Inter_700Bold",
              },
            ]}
          >
            Play Again
          </Text>
        </Pressable>

        <Pressable
          testID="new-game-btn"
          onPress={handleNewGame}
          style={({ pressed }) => [
            styles.secondaryBtn,
            {
              borderColor: colors.border,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <Text
            style={[
              styles.secondaryBtnText,
              {
                color: colors.mutedForeground,
                fontFamily: "Inter_500Medium",
              },
            ]}
          >
            New Game
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// ScoreCard
// ---------------------------------------------------------------------------

type ColorTokens = ReturnType<typeof useColors>;

function ScoreCard({
  name,
  score,
  teamColor,
  isWinner,
  colors,
}: {
  name: string;
  score: number;
  teamColor: string;
  isWinner: boolean;
  colors: ColorTokens;
}) {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isWinner ? teamColor + "18" : colors.card,
          borderColor: isWinner ? teamColor : colors.border,
        },
      ]}
    >
      <Text
        style={[
          styles.cardName,
          { color: teamColor, fontFamily: "Inter_600SemiBold" },
        ]}
        numberOfLines={1}
      >
        {name}
      </Text>
      <Text
        style={[
          styles.cardScore,
          { color: colors.foreground, fontFamily: "Inter_700Bold" },
        ]}
      >
        {score}
      </Text>
      <Text
        style={[
          styles.cardPts,
          { color: colors.mutedForeground, fontFamily: "Inter_400Regular" },
        ]}
      >
        pts
      </Text>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: { flex: 1 },

  // Banner
  bannerSection: {
    alignItems: "center",
    paddingTop: 48,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  outcomeLabel: {
    fontSize: 12,
    letterSpacing: 2,
    marginBottom: 10,
  },
  winnerName: {
    fontSize: 42,
    letterSpacing: 0.5,
    textAlign: "center",
  },
  tieText: {
    fontSize: 24,
    textAlign: "center",
  },

  // Score row
  scoreRow: {
    flexDirection: "row",
    paddingHorizontal: 24,
    gap: 0,
  },
  vsDivider: {
    width: 1,
    marginVertical: 12,
    marginHorizontal: 8,
  },
  card: {
    flex: 1,
    borderWidth: 1.5,
    borderRadius: 14,
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 12,
    gap: 4,
  },
  cardName: {
    fontSize: 13,
    letterSpacing: 0.3,
    marginBottom: 6,
  },
  cardScore: {
    fontSize: 52,
    lineHeight: 58,
  },
  cardPts: {
    fontSize: 12,
    letterSpacing: 1,
  },

  spacer: { flex: 1 },

  // Footer
  footer: {
    paddingHorizontal: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    gap: 10,
  },
  primaryBtn: {
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBtnText: {
    fontSize: 16,
    letterSpacing: 0.5,
  },
  secondaryBtn: {
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryBtnText: {
    fontSize: 14,
    letterSpacing: 0.3,
  },
});
