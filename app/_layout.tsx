import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "../theme/ThemeProvider";
import { Stack } from "expo-router";
import "../locales/i18n";

/**
 * Root layout wraps the entire app.
 * Everything rendered by expo-router will be nested inside this.
 */
export default function RootLayout() {
  return (
    // SafeAreaProvider makes sure all screens respect iOS notches / Android status bars
    <SafeAreaProvider>
      {/* ThemeProvider wraps the whole app so useTheme() works anywhere */}
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="Welcome"
            options={{ headerShown: false, gestureEnabled: false }}
          />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
