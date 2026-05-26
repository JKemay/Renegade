import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useRenegade } from "@/context/RenegadeContext";
import { useColors } from "@/hooks/useColors";
import { clearBoardSession, hydrateSeenQuestions } from "@/store/gameSession";
import { getTimerSeconds, saveTimerSeconds } from "@/store/settings";
import { supabase } from "@/lib/supabase";

const TIMER_OPTIONS = [30, 45, 60] as const;

export default function SettingsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { resetGame } = useRenegade();

  const [timerSeconds, setTimerSeconds] = useState(getTimerSeconds());

  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const handleSetTimer = async (seconds: number) => {
    setTimerSeconds(seconds);
    await saveTimerSeconds(seconds);
  };

  const handleResetHistory = () => {
    Alert.alert(
      "Reset Question History",
      "You'll start seeing questions you've already played. This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            await supabase.from("seen_questions").delete().gte("played_at", new Date(0).toISOString());
            hydrateSeenQuestions([]);
            Alert.alert("Done", "Your question history has been cleared.");
          },
        },
      ],
    );
  };

  const handleClearData = () => {
    Alert.alert(
      "Clear All Data",
      "This will reset all game data and return you to the home screen.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            resetGame();
            await clearBoardSession();
            router.replace("/" as never);
          },
        },
      ],
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background, paddingTop: topPad },
      ]}
    >
      {/* Nav bar */}
      <View style={[styles.navBar, { borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Text
            style={[
              styles.backBtn,
              { color: colors.mutedForeground, fontFamily: "Inter_500Medium" },
            ]}
          >
            ← Back
          </Text>
        </Pressable>
        <Text
          style={[
            styles.navTitle,
            { color: colors.foreground, fontFamily: "Inter_700Bold" },
          ]}
        >
          Settings
        </Text>
        <View style={{ width: 52 }} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Timer */}
        <View style={[styles.section, { borderColor: colors.border }]}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.foreground, fontFamily: "Inter_600SemiBold" },
            ]}
          >
            Round Timer
          </Text>
          <Text
            style={[
              styles.sectionDesc,
              { color: colors.mutedForeground, fontFamily: "Inter_400Regular" },
            ]}
          >
            How long each team has to answer a question.
          </Text>
          <View style={styles.timerRow}>
            {TIMER_OPTIONS.map((secs) => {
              const active = timerSeconds === secs;
              return (
                <Pressable
                  key={secs}
                  onPress={() => handleSetTimer(secs)}
                  style={({ pressed }) => [
                    styles.timerBtn,
                    {
                      backgroundColor: active ? colors.primary : colors.card,
                      borderColor: active ? colors.primary : colors.border,
                      opacity: pressed ? 0.75 : 1,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.timerBtnText,
                      {
                        color: active
                          ? colors.primaryForeground
                          : colors.foreground,
                        fontFamily: "Inter_700Bold",
                      },
                    ]}
                  >
                    {secs}s
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Question history */}
        <View style={[styles.section, { borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
            Question History
          </Text>
          <Text style={[styles.sectionDesc, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
            The game tracks which questions you've seen so returning players get fresh questions. Reset if you want to replay old ones.
          </Text>
          <Pressable
            onPress={handleResetHistory}
            style={({ pressed }) => [
              styles.dangerBtn,
              { borderColor: colors.border, opacity: pressed ? 0.75 : 1 },
            ]}
          >
            <Text style={[styles.dangerBtnText, { color: colors.mutedForeground, fontFamily: "Inter_600SemiBold" }]}>
              Reset Question History
            </Text>
          </Pressable>
        </View>

        {/* Game data */}
        <View style={[styles.section, { borderColor: colors.border }]}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.foreground, fontFamily: "Inter_600SemiBold" },
            ]}
          >
            Game Data
          </Text>
          <Text
            style={[
              styles.sectionDesc,
              { color: colors.mutedForeground, fontFamily: "Inter_400Regular" },
            ]}
          >
            Resets all saved game state and returns to the home screen.
          </Text>
          <Pressable
            onPress={handleClearData}
            style={({ pressed }) => [
              styles.dangerBtn,
              {
                borderColor: colors.destructive,
                opacity: pressed ? 0.75 : 1,
              },
            ]}
          >
            <Text
              style={[
                styles.dangerBtnText,
                {
                  color: colors.destructive,
                  fontFamily: "Inter_600SemiBold",
                },
              ]}
            >
              Clear All Data
            </Text>
          </Pressable>
        </View>

        {/* Legal */}
        <View style={[styles.section, { borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
            Legal
          </Text>
          <Pressable
            onPress={() => router.push("/privacy" as never)}
            style={({ pressed }) => [
              styles.dangerBtn,
              { borderColor: colors.border, opacity: pressed ? 0.75 : 1 },
            ]}
          >
            <Text style={[styles.dangerBtnText, { color: colors.mutedForeground, fontFamily: "Inter_600SemiBold" }]}>
              Privacy Policy
            </Text>
          </Pressable>
        </View>

        {/* Version */}
        <Text
          style={[
            styles.version,
            { color: colors.mutedForeground, fontFamily: "Inter_400Regular" },
          ]}
        >
          Renegade v0.1.0
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  backBtn: { fontSize: 14, minWidth: 52 },
  navTitle: { fontSize: 17 },
  content: { padding: 20, gap: 20 },
  section: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    gap: 10,
  },
  sectionTitle: { fontSize: 15 },
  sectionDesc: { fontSize: 13, lineHeight: 18 },
  timerRow: { flexDirection: "row", gap: 8, marginTop: 2 },
  timerBtn: {
    flex: 1,
    height: 46,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  timerBtnText: { fontSize: 16 },
  dangerBtn: {
    height: 46,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  dangerBtnText: { fontSize: 15 },
  version: {
    textAlign: "center",
    fontSize: 12,
    marginTop: 4,
  },
});
