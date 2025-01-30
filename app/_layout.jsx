import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { Appearance } from "react-native";
import { TaskProvider } from "@/contexts/TaskContext";

export default function RootLayout() {
  const colorScheme = Appearance.getColorScheme();

  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <TaskProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </TaskProvider>
  );
}
