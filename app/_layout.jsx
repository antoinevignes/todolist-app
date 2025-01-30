import { Stack } from "expo-router";
import { TaskProvider } from "@/contexts/TaskContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "../contexts/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <SafeAreaProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="tasks/[id]" />
          </Stack>
        </SafeAreaProvider>
      </TaskProvider>
    </ThemeProvider>
  );
}
