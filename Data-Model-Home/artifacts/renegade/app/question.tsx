import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
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
import { getTimerSeconds } from "@/store/settings";
import {
  TeamKey,
  Tier,
  addSeenQuestion,
  isAidUsed,
  isQuestionSeen,
  markAidUsed,
  setPendingResult,
} from "@/store/gameSession";
import { recordSeenQuestion } from "@/store/seenQuestions";
import { AidId } from "@/types/game";

// ---------------------------------------------------------------------------
// Types / constants
// ---------------------------------------------------------------------------

type Phase = "question" | "revealed" | "steal";
type Turn = TeamKey;

// Read fresh on each component mount so Settings changes take effect immediately
const getBaseSeconds = () => getTimerSeconds();

// Aids that are used before the answer is revealed (active team)
const PRE_REVEAL_AIDS: AidId[] = ["double", "phone", "insider", "split", "veto", "skip"];

function formatTime(s: number): string {
  const m = Math.floor(Math.max(s, 0) / 60);
  const sec = Math.max(s, 0) % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

const AID_LABEL: Record<AidId, string> = {
  skip: "SKIP",
  split: "SPLIT",
  steal: "STEAL",
  phone: "+30s",
  double: "2×",
  veto: "VETO",
  insider: "HINT",
};

// ---------------------------------------------------------------------------
// Question screen
// ---------------------------------------------------------------------------

export default function QuestionScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { game } = useRenegade();

  const params = useLocalSearchParams<{
    categoryId: string;
    tier: string;
    slotIndex: string;
    currentTurn: string;
    questionSeed: string;
    team1Name: string;
    team2Name: string;
  }>();

  const categoryId = params.categoryId ?? "";
  const tier = parseInt(params.tier ?? "200") as Tier;
  const slotIndex = Number(params.slotIndex ?? 0);
  const questionSeed = Number(params.questionSeed ?? 0);
  const activeTurn = (params.currentTurn ?? "team1") as Turn;
  const opposingTurn: Turn = activeTurn === "team1" ? "team2" : "team1";

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  // --- Game config ---
  const activeTeamName =
    activeTurn === "team1"
      ? (game?.team1Name ?? "Team 1")
      : (game?.team2Name ?? "Team 2");
  const opposingTeamName =
    activeTurn === "team1"
      ? (game?.team2Name ?? "Team 2")
      : (game?.team1Name ?? "Team 1");
  const activeColor = activeTurn === "team1" ? colors.team1 : colors.team2;
  const opposingColor = activeTurn === "team1" ? colors.team2 : colors.team1;

  const activeTeamAids: AidId[] = activeTurn === "team1"
    ? (game?.team1Aids ?? [])
    : (game?.team2Aids ?? []);
  const opposingTeamAids: AidId[] = activeTurn === "team1"
    ? (game?.team2Aids ?? [])
    : (game?.team1Aids ?? []);

  // --- Question lookup ---
  const category = CATEGORIES.find((c) => c.id === categoryId);
  const tierQuestions = category?.questions.filter((q) => q.tier === tier) ?? [];
  const unseenQuestions = tierQuestions.filter((q) => !isQuestionSeen(q.id));
  // Fall back to full pool if every question in this tier has been seen
  const pool = unseenQuestions.length > 0 ? unseenQuestions : tierQuestions;
  const question =
    pool.length > 0 ? pool[(slotIndex + questionSeed) % pool.length] : null;

  // Mark the question seen immediately so the in-memory Set and AsyncStorage
  // snapshot stay consistent even if the user force-quits before scoring.
  useEffect(() => {
    if (question?.id) addSeenQuestion(question.id);
  }, [question?.id]);

  // --- Timer ---
  const [timeLeft, setTimeLeft] = useState(() => getBaseSeconds());
  const [timerRunning, setTimerRunning] = useState(true);

  useEffect(() => {
    if (!timerRunning) return;
    if (timeLeft <= 0) {
      setTimerRunning(false);
      setPhase("revealed");
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, timerRunning]);

  const timerColor =
    timeLeft > 15 ? colors.foreground : timeLeft > 8 ? "#F59E0B" : "#EF4444";

  // --- Aid & phase state ---
  const [phase, setPhase] = useState<Phase>("question");
  const [doubleActive, setDoubleActive] = useState(false);
  const [insiderActive, setInsiderActive] = useState(false);
  const [splitActive, setSplitActive] = useState(false);
  const [vetoActive, setVetoActive] = useState(false);

  // Deltas accumulated before steal phase resolves
  const baseDeltaRef = useRef({ team1: 0, team2: 0 });

  // Track which aids were consumed this question (for immediate UI disable)
  const [consumedThisQuestion, setConsumedThisQuestion] = useState<Set<AidId>>(
    new Set(),
  );

  const aidAvailable = (team: Turn, aid: AidId): boolean => {
    const teamAids = team === activeTurn ? activeTeamAids : opposingTeamAids;
    return (
      teamAids.includes(aid) &&
      !isAidUsed(team, aid) &&
      !consumedThisQuestion.has(aid)
    );
  };

  const useAid = (team: Turn, aid: AidId) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    markAidUsed(team, aid);
    setConsumedThisQuestion((prev) => new Set([...prev, aid]));
  };

  // --- Aid handlers ---
  const handleSkip = () => {
    useAid(activeTurn, "skip");
    submitResult(0, 0);
  };

  const handlePhone = () => {
    useAid(activeTurn, "phone");
    setTimeLeft((t) => t + 30);
    setTimerRunning(true);
  };

  const handleDouble = () => {
    useAid(activeTurn, "double");
    setDoubleActive(true);
  };

  const handleInsider = () => {
    useAid(activeTurn, "insider");
    setInsiderActive(true);
  };

  const handleSplit = () => {
    useAid(activeTurn, "split");
    setSplitActive(true);
  };

  const handleVeto = () => {
    useAid(activeTurn, "veto");
    setVetoActive(true);
  };

  // --- Reveal ---
  const handleReveal = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setTimerRunning(false);
    setPhase("revealed");
  };

  // --- Award ---
  const submitResult = (t1Delta: number, t2Delta: number) => {
    if (question?.id) {
      recordSeenQuestion(question.id);
    }
    setPendingResult({
      categoryId,
      tier,
      slotIndex,
      team1ScoreDelta: t1Delta,
      team2ScoreDelta: t2Delta,
      skipTurnFor: vetoActive ? opposingTurn : undefined,
    });
    router.back();
  };

  const handleActiveCorrect = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const points = doubleActive ? tier * 2 : tier;
    const t1 = activeTurn === "team1" ? points : 0;
    const t2 = activeTurn === "team2" ? points : 0;
    submitResult(t1, t2);
  };

  const handleNobodyGotIt = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    const penalty = doubleActive ? tier * 2 : 0;
    const t1Base = activeTurn === "team1" ? -penalty : 0;
    const t2Base = activeTurn === "team2" ? -penalty : 0;

    if (aidAvailable(opposingTurn, "steal")) {
      // Stash base deltas and enter steal phase
      baseDeltaRef.current = { team1: t1Base, team2: t2Base };
      setPhase("steal");
    } else {
      submitResult(t1Base, t2Base);
    }
  };

  // --- Steal ---
  const handleStealCorrect = () => {
    useAid(opposingTurn, "steal");
    const extra = tier; // steal is always face value
    const t1 = baseDeltaRef.current.team1 + (opposingTurn === "team1" ? extra : 0);
    const t2 = baseDeltaRef.current.team2 + (opposingTurn === "team2" ? extra : 0);
    submitResult(t1, t2);
  };

  const handleStealMissed = () => {
    useAid(opposingTurn, "steal");
    submitResult(baseDeltaRef.current.team1, baseDeltaRef.current.team2);
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background, paddingTop: topPad },
      ]}
    >
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text
          style={[
            styles.headerTitle,
            { color: colors.foreground, fontFamily: "Inter_600SemiBold" },
          ]}
          numberOfLines={1}
        >
          {category?.name ?? categoryId} · {tier}
        </Text>

        {/* Timer */}
        <Text
          style={[
            styles.timer,
            { color: timerColor, fontFamily: "Inter_700Bold" },
          ]}
        >
          {formatTime(timeLeft)}
        </Text>
      </View>

      {/* Main content */}
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: bottomPad + 24 },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        {/* Turn pill */}
        <View style={[styles.turnPill, { backgroundColor: activeColor + "22" }]}>
          <View style={[styles.turnDot, { backgroundColor: activeColor }]} />
          <Text
            style={[
              styles.turnPillText,
              { color: activeColor, fontFamily: "Inter_600SemiBold" },
            ]}
          >
            {activeTeamName}'s turn
          </Text>
        </View>

        {/* ── STEAL PHASE ── */}
        {phase === "steal" && (
          <StealPhase
            opposingTeamName={opposingTeamName}
            opposingColor={opposingColor}
            tier={tier}
            onCorrect={handleStealCorrect}
            onMissed={handleStealMissed}
            colors={colors}
          />
        )}

        {/* ── QUESTION + REVEALED PHASES ── */}
        {phase !== "steal" && (
          <>
            {/* Active banners */}
            {doubleActive && (
              <View
                style={[
                  styles.activeBanner,
                  { backgroundColor: activeColor + "22", borderColor: activeColor },
                ]}
              >
                <Text
                  style={[
                    styles.activeBannerText,
                    { color: activeColor, fontFamily: "Inter_700Bold" },
                  ]}
                >
                  2× WAGERED — Double or Nothing
                </Text>
              </View>
            )}
            {insiderActive && (
              <View
                style={[
                  styles.activeBanner,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.activeBannerText,
                    { color: colors.foreground, fontFamily: "Inter_600SemiBold" },
                  ]}
                >
                  💡 Insider active — give one word now
                </Text>
              </View>
            )}
            {splitActive && (
              <View
                style={[
                  styles.activeBanner,
                  { backgroundColor: colors.card, borderColor: colors.border },
                ]}
              >
                <Text
                  style={[
                    styles.activeBannerText,
                    { color: colors.foreground, fontFamily: "Inter_600SemiBold" },
                  ]}
                >
                  Split — announce two options (A: correct, B: your choice)
                </Text>
              </View>
            )}
            {vetoActive && (
              <View
                style={[
                  styles.activeBanner,
                  { backgroundColor: activeColor + "22", borderColor: activeColor },
                ]}
              >
                <Text
                  style={[
                    styles.activeBannerText,
                    { color: activeColor, fontFamily: "Inter_700Bold" },
                  ]}
                >
                  Veto active - opponents skip their next pick
                </Text>
              </View>
            )}

            {/* Question prompt */}
            <View style={styles.promptBox}>
              {question ? (
                <>
                  <Text
                    style={[
                      styles.prompt,
                      { color: colors.foreground, fontFamily: "Inter_600SemiBold" },
                    ]}
                  >
                    {question.prompt}
                  </Text>
                  {question.imageUri ? (
                    <Image
                      source={{ uri: question.imageUri }}
                      style={styles.questionImage}
                      resizeMode="contain"
                    />
                  ) : null}
                </>
              ) : (
                <Text
                  style={[
                    styles.noQuestion,
                    { color: colors.mutedForeground, fontFamily: "Inter_400Regular" },
                  ]}
                >
                  No questions loaded yet for this category.{"\n"}Award points
                  manually.
                </Text>
              )}
            </View>


            {/* Pre-reveal aids */}
            {phase === "question" && (
              <View style={styles.aidsRow}>
                {PRE_REVEAL_AIDS.filter((aid) =>
                  activeTeamAids.includes(aid),
                ).map((aid) => {
                  const available = aidAvailable(activeTurn, aid);
                  const handler = {
                    skip: handleSkip,
                    phone: handlePhone,
                    double: handleDouble,
                    insider: handleInsider,
                    split: handleSplit,
                    veto: handleVeto,
                    steal: () => {},
                  }[aid];

                  return (
                    <Pressable
                      key={aid}
                      testID={`aid-${aid}`}
                      onPress={handler}
                      disabled={!available}
                      style={({ pressed }) => [
                        styles.aidChip,
                        {
                          backgroundColor: available
                            ? activeColor + "22"
                            : colors.card,
                          borderColor: available ? activeColor : colors.border,
                          opacity: available ? (pressed ? 0.65 : 1) : 0.3,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.aidChipText,
                          {
                            color: available ? activeColor : colors.mutedForeground,
                            fontFamily: "Inter_700Bold",
                          },
                        ]}
                      >
                        {AID_LABEL[aid]}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            )}

            {/* Reveal button */}
            {phase === "question" && (
              <Pressable
                testID="reveal-btn"
                onPress={handleReveal}
                style={({ pressed }) => [
                  styles.revealBtn,
                  {
                    backgroundColor: activeColor,
                    opacity: pressed ? 0.85 : 1,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.revealBtnText,
                    { color: "#fff", fontFamily: "Inter_700Bold" },
                  ]}
                >
                  Reveal Answer ▶
                </Text>
              </Pressable>
            )}

            {/* Answer panel */}
            {phase === "revealed" && (
              <AnswerPanel
                question={question}
                tier={tier}
                doubleActive={doubleActive}
                activeTeamName={activeTeamName}
                activeColor={activeColor}
                onActiveCorrect={handleActiveCorrect}
                onNobody={handleNobodyGotIt}
                colors={colors}
              />
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

// ---------------------------------------------------------------------------
// AnswerPanel
// ---------------------------------------------------------------------------

type ColorTokens = ReturnType<typeof useColors>;

function AnswerPanel({
  question,
  tier,
  doubleActive,
  activeTeamName,
  activeColor,
  onActiveCorrect,
  onNobody,
  colors,
}: {
  question: (typeof CATEGORIES)[number]["questions"][number] | null;
  tier: Tier;
  doubleActive: boolean;
  activeTeamName: string;
  activeColor: string;
  onActiveCorrect: () => void;
  onNobody: () => void;
  colors: ColorTokens;
}) {
  const points = doubleActive ? tier * 2 : tier;

  return (
    <View style={styles.answerPanel}>
      <Text
        style={[
          styles.answerLabel,
          { color: colors.mutedForeground, fontFamily: "Inter_500Medium" },
        ]}
      >
        ANSWER
      </Text>

      {question ? (
        <>
          <Text
            style={[
              styles.answerText,
              { color: colors.foreground, fontFamily: "Inter_700Bold" },
            ]}
          >
            {question.answer}
          </Text>
          {question.acceptableAnswers && question.acceptableAnswers.filter((a) => a !== question.answer).length > 0 && (
            <Text
              style={[
                styles.acceptable,
                { color: colors.mutedForeground, fontFamily: "Inter_400Regular" },
              ]}
            >
              Also accepted: {question.acceptableAnswers.filter((a) => a !== question.answer).join(", ")}
            </Text>
          )}
          {question.explanation && (
            <Text
              style={[
                styles.explanation,
                { color: colors.mutedForeground, fontFamily: "Inter_400Regular" },
              ]}
            >
              {question.explanation}
            </Text>
          )}
        </>
      ) : (
        <Text
          style={[
            styles.answerText,
            { color: colors.mutedForeground, fontFamily: "Inter_600SemiBold" },
          ]}
        >
          —
        </Text>
      )}

      <View style={styles.awardRow}>
        <Pressable
          testID="award-active"
          onPress={onActiveCorrect}
          style={({ pressed }) => [
            styles.awardBtn,
            styles.awardBtnCorrect,
            { backgroundColor: activeColor, opacity: pressed ? 0.85 : 1 },
          ]}
        >
          <Text
            style={[
              styles.awardBtnText,
              { color: "#fff", fontFamily: "Inter_700Bold" },
            ]}
          >
            ✓ {activeTeamName}
          </Text>
          <Text
            style={[
              styles.awardBtnPoints,
              { color: "rgba(255,255,255,0.75)", fontFamily: "Inter_500Medium" },
            ]}
          >
            +{points} pts{doubleActive ? " (2×)" : ""}
          </Text>
        </Pressable>

        <Pressable
          testID="award-nobody"
          onPress={onNobody}
          style={({ pressed }) => [
            styles.awardBtn,
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
              styles.awardBtnText,
              { color: colors.foreground, fontFamily: "Inter_700Bold" },
            ]}
          >
            ✗ Nobody
          </Text>
          {doubleActive && (
            <Text
              style={[
                styles.awardBtnPoints,
                { color: "#EF4444", fontFamily: "Inter_500Medium" },
              ]}
            >
              −{tier * 2} pts (2×)
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// StealPhase
// ---------------------------------------------------------------------------

function StealPhase({
  opposingTeamName,
  opposingColor,
  tier,
  onCorrect,
  onMissed,
  colors,
}: {
  opposingTeamName: string;
  opposingColor: string;
  tier: Tier;
  onCorrect: () => void;
  onMissed: () => void;
  colors: ColorTokens;
}) {
  return (
    <View style={styles.stealPhase}>
      <View
        style={[styles.stealHeader, { borderColor: opposingColor }]}
      >
        <Text
          style={[
            styles.stealTitle,
            { color: opposingColor, fontFamily: "Inter_700Bold" },
          ]}
        >
          STEAL
        </Text>
        <Text
          style={[
            styles.stealSub,
            { color: colors.foreground, fontFamily: "Inter_600SemiBold" },
          ]}
        >
          {opposingTeamName} gets one shot
        </Text>
      </View>

      <Pressable
        testID="steal-correct"
        onPress={onCorrect}
        style={({ pressed }) => [
          styles.stealBtn,
          { backgroundColor: opposingColor, opacity: pressed ? 0.85 : 1 },
        ]}
      >
        <Text
          style={[
            styles.stealBtnText,
            { color: "#fff", fontFamily: "Inter_700Bold" },
          ]}
        >
          ✓ {opposingTeamName} got it
        </Text>
        <Text
          style={[
            styles.stealBtnPoints,
            { color: "rgba(255,255,255,0.75)", fontFamily: "Inter_500Medium" },
          ]}
        >
          +{tier} pts
        </Text>
      </Pressable>

      <Pressable
        testID="steal-missed"
        onPress={onMissed}
        style={({ pressed }) => [
          styles.stealBtn,
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
            styles.stealBtnText,
            { color: colors.foreground, fontFamily: "Inter_700Bold" },
          ]}
        >
          ✗ Missed
        </Text>
      </Pressable>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: { flex: 1 },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    gap: 8,
  },
  backBtn: { minWidth: 52 },
  backLabel: { fontSize: 14 },
  headerTitle: { flex: 1, fontSize: 13, textAlign: "center" },
  timer: { fontSize: 18, minWidth: 44, textAlign: "right" },

  // Scroll
  scroll: { paddingHorizontal: 20, paddingTop: 20 },

  // Turn pill
  turnPill: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 7,
    marginBottom: 20,
  },
  turnDot: { width: 7, height: 7, borderRadius: 3.5 },
  turnPillText: { fontSize: 13 },

  // Active banners
  activeBanner: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    alignItems: "center",
  },
  activeBannerText: { fontSize: 13, textAlign: "center" },

  // Question prompt
  promptBox: {
    minHeight: 120,
    justifyContent: "center",
    marginBottom: 24,
  },
  prompt: {
    fontSize: 22,
    lineHeight: 32,
    textAlign: "center",
  },
  questionImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginTop: 14,
  },
  noQuestion: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },

  // Aids row
  aidsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
    marginBottom: 24,
  },
  aidChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  aidChipText: { fontSize: 13, letterSpacing: 0.5 },

  // Reveal button
  revealBtn: {
    height: 56,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  revealBtnText: { fontSize: 17, letterSpacing: 0.5 },

  // Answer panel
  answerPanel: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 24,
    marginTop: 8,
  },
  answerLabel: { fontSize: 11, letterSpacing: 1.5, marginBottom: 8 },
  answerText: { fontSize: 28, lineHeight: 36, marginBottom: 8 },
  acceptable: { fontSize: 13, marginBottom: 6 },
  explanation: { fontSize: 13, lineHeight: 19, marginBottom: 24 },

  // Award buttons
  awardRow: { gap: 10, marginTop: 16 },
  awardBtn: {
    height: 64,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  awardBtnCorrect: {},
  awardBtnText: { fontSize: 16 },
  awardBtnPoints: { fontSize: 12 },

  // Steal phase
  stealPhase: { marginTop: 16 },
  stealHeader: {
    borderWidth: 1.5,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    gap: 4,
    marginBottom: 20,
  },
  stealTitle: { fontSize: 22, letterSpacing: 2 },
  stealSub: { fontSize: 15 },
  stealBtn: {
    height: 64,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    gap: 2,
  },
  stealBtnText: { fontSize: 16 },
  stealBtnPoints: { fontSize: 12 },
});
