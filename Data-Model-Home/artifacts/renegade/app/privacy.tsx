import { useRouter } from "expo-router";
import React from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";

export default function PrivacyScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const topPad = Platform.OS === "web" ? 67 : insets.top;

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: topPad }]}>
      {/* Nav bar */}
      <View style={[styles.navBar, { borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Text style={[styles.backBtn, { color: colors.mutedForeground, fontFamily: "Inter_500Medium" }]}>
            ← Back
          </Text>
        </Pressable>
        <Text style={[styles.navTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
          Privacy Policy
        </Text>
        <View style={{ width: 52 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.updated, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
          Last updated: May 2025
        </Text>

        <Section title="Overview" colors={colors}>
          Renegade is a local two-team trivia game. We collect the minimum data
          necessary to run the app and nothing more. No account is required, no
          personal information is collected, and there are no ads.
        </Section>

        <Section title="Data We Store" colors={colors}>
          <BulletItem colors={colors}>
            <Text style={[styles.bodyText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              <Text style={{ fontFamily: "Inter_600SemiBold", color: colors.foreground }}>Game history</Text>
              {" — team names you enter, final scores, and the date of each game. Stored on our server (Supabase) to show your stats on the home screen. Team names are not linked to any account or identity."}
            </Text>
          </BulletItem>
          <BulletItem colors={colors}>
            <Text style={[styles.bodyText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              <Text style={{ fontFamily: "Inter_600SemiBold", color: colors.foreground }}>Seen questions</Text>
              {" — a list of question IDs you've already played, stored on our server so you get fresh questions each session. No question content is sent, only the IDs."}
            </Text>
          </BulletItem>
          <BulletItem colors={colors}>
            <Text style={[styles.bodyText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              <Text style={{ fontFamily: "Inter_600SemiBold", color: colors.foreground }}>Settings</Text>
              {" — your timer preference (30/45/60s) is stored locally on your device only and never leaves it."}
            </Text>
          </BulletItem>
        </Section>

        <Section title="What We Don't Collect" colors={colors}>
          <BulletItem colors={colors}>
            <Text style={[styles.bodyText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              No name, email, phone number, or account credentials
            </Text>
          </BulletItem>
          <BulletItem colors={colors}>
            <Text style={[styles.bodyText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              No location data
            </Text>
          </BulletItem>
          <BulletItem colors={colors}>
            <Text style={[styles.bodyText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              No device identifiers or advertising IDs
            </Text>
          </BulletItem>
          <BulletItem colors={colors}>
            <Text style={[styles.bodyText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              No analytics or crash reporting SDKs
            </Text>
          </BulletItem>
          <BulletItem colors={colors}>
            <Text style={[styles.bodyText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              No third-party advertising or tracking
            </Text>
          </BulletItem>
        </Section>

        <Section title="Anonymous Sessions" colors={colors}>
          The app uses Supabase to store game history and seen questions. A
          random anonymous session ID is created automatically on first launch.
          This ID is not linked to any personal information and is stored only
          on your device.
        </Section>

        <Section title="Data Sharing" colors={colors}>
          We do not sell, rent, or share your data with any third party. The
          only third-party service used is Supabase (database hosting). Supabase
          processes data on servers in the EU and US. You can review their
          privacy policy at supabase.com/privacy.
        </Section>

        <Section title="Data Deletion" colors={colors}>
          You can clear all locally stored game data at any time from
          Settings → Clear All Data. To request deletion of server-side records
          (game history and seen questions), contact us at the email below.
        </Section>

        <Section title="Children" colors={colors}>
          Renegade is not directed at children under 13. We do not knowingly
          collect data from children.
        </Section>

        <Section title="Contact" colors={colors}>
          Questions about this policy? Email us at{" "}
          <Text style={{ color: colors.primary }}>support@renegadegame.app</Text>
        </Section>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

type SectionProps = {
  title: string;
  colors: ReturnType<typeof import("@/hooks/useColors").useColors>;
  children: React.ReactNode;
};

function Section({ title, colors, children }: SectionProps) {
  return (
    <View style={[styles.section, { borderColor: colors.border }]}>
      <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
        {title}
      </Text>
      {typeof children === "string" ? (
        <Text style={[styles.bodyText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
}

type BulletProps = {
  colors: ReturnType<typeof import("@/hooks/useColors").useColors>;
  children: React.ReactNode;
};

function BulletItem({ colors, children }: BulletProps) {
  return (
    <View style={styles.bulletRow}>
      <Text style={[styles.bullet, { color: colors.primary }]}>•</Text>
      <View style={styles.bulletContent}>{children}</View>
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
  scroll: { flex: 1 },
  content: { padding: 20, gap: 16 },
  updated: { fontSize: 12, marginBottom: 4 },
  section: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    gap: 10,
  },
  sectionTitle: { fontSize: 15 },
  bodyText: { fontSize: 13, lineHeight: 20 },
  bulletRow: { flexDirection: "row", gap: 8 },
  bullet: { fontSize: 13, lineHeight: 20 },
  bulletContent: { flex: 1 },
});
