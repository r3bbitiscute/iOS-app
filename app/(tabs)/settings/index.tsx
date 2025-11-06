import React, { useCallback, useMemo, useState } from "react";
import SettingsList from "../../../components/SettingsList";
import type { Card } from "../../../types/settings";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../../theme/ThemeProvider";
import { useTranslation } from "react-i18next";

export default function SettingsScreen() {
  const { colors: C, isDark, setMode } = useTheme();
  const { t } = useTranslation();

  const [switches, setSwitches] = useState<Record<string, boolean>>({
    dark: isDark,
  });

  /**
   * Handler to toggle switches in Settings
   */
  const handleToggle = useCallback(
    (id: string, next: boolean) => {
      if (id === "dark") setMode(next ? "dark" : "light");
      setSwitches((prev) => ({ ...prev, [id]: next }));
    },
    [setMode]
  );

  const cards: Card[] = useMemo(
    () => [
      {
        id: "profile",
        sectionLabel: t("profile"),
        rows: [
          {
            id: "patientProfile",
            type: "link",
            title: t("patientProfile"),
            icon: "person-circle-outline",
            route: "/(tabs)/settings/Profile",
          },
        ],
      },
      {
        id: "general",
        sectionLabel: t("general"),
        rows: [
          {
            id: "dark",
            type: "switch",
            title: isDark ? t("lightMode") : t("darkMode"),
            icon: isDark ? "sunny" : "moon",
            switchValue: isDark,
          },
          {
            id: "notif",
            type: "link",
            title: t("notification"),
            icon: "notifications-outline",
            route: "/(tabs)/settings/Notification",
          },
          {
            id: "language",
            type: "link",
            title: t("language"),
            icon: "language-outline",
            route: "/(tabs)/settings/Language",
          },
        ],
      },
      {
        id: "pap-machine",
        sectionLabel: t("papMachine"),
        rows: [
          {
            id: "no-pap-machine",
            type: "note",
            title: t("noPapMachine"),
            icon: "close",
          },
        ],
      },
      {
        id: "oximeter",
        sectionLabel: t("oximeter"),
        rows: [
          {
            id: "no-oximeter",
            type: "note",
            title: t("noOximeter"),
            icon: "close",
          },
        ],
      },
      {
        id: "support",
        sectionLabel: t("support"),
        rows: [
          {
            id: "faq",
            type: "link",
            title: t("faq"),
            icon: "help-circle-outline",
            route: "/(tabs)/settings/FAQ",
          },
        ],
      },
    ],
    [t, isDark]
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: C.bg }}
      edges={["top", "left", "right"]}>
      <SettingsList
        cards={cards}
        titleFlag={true}
        ctaFlag={{ enabled: true, label: t("signOut") }}
        switchValues={switches}
        onToggleSwitch={handleToggle}
      />
    </SafeAreaView>
  );
}
