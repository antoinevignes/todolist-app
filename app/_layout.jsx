import { Stack } from "expo-router";
import { TaskProvider } from "@/contexts/TaskContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <TaskProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </TaskProvider>
    </SafeAreaProvider>
  );
}
