import { Stack } from "expo-router";
import { TaskProvider } from "@/contexts/TaskContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "../contexts/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <SafeAreaProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaProvider>
      </TaskProvider>
    </ThemeProvider>
  );
}
