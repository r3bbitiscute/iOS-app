import { Ionicons } from "@expo/vector-icons";

export type RowType =
  | "switch"
  | "link"
  | "button"
  | "radio-button"
  | "note"
  | "text-input";

export type Card = {
  id: string;
  sectionLabel?: string;
  rows: Array<{
    id: string;
    type: RowType;
    title: string;
    subtitle?: string;
    icon?: keyof typeof Ionicons.glyphMap;
    route?: string; // for "link"
    onPress?: () => void; // for "button" & "radio-button"
  }>;
};

export type ListItem =
  | { kind: "title" }
  | { kind: "spacer"; id: string }
  | { kind: "section"; id: string; label: string }
  | { kind: "card"; id: string; card: Card }
  | { kind: "cta" };
