import { Platform, StyleSheet, Text } from "react-native";
import TextInputComp from "../components/TextInputComp";
import FlatListComp from "../components/FlatListComp";
import { SafeAreaView } from "react-native-safe-area-context";

import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import { useTheme } from "@/contexts/ThemeContext";

export default function Index() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [loaded, error] = useFonts({
    Inter_500Medium,
  });

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaView
      style={styles.view}
      contentContainerStyle={
        Platform.OS === "web" ? styles.contentContainer : null
      }
    >
      <Text style={styles.title}>Gestionnaire de tâches</Text>

      <TextInputComp />

      <FlatListComp />
    </SafeAreaView>
  );
}

function createStyles(theme) {
  return StyleSheet.create({
    view: {
      flex: 1,
      backgroundColor: theme.background,
    },
    contentContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background,
    },
    title: {
      color: theme.text,
      padding: 40,
      fontSize: 24,
      textAlign: "center",
      fontFamily: "Inter_500Medium",
    },
    text: {
      color: theme.text,
      fontSize: 16,
      fontFamily: "Inter_500Medium",
    },
  });
}
