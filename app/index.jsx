import { Colors } from "@/constants/Colors";
import {
  Appearance,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import TextInputComp from "./TextInputComp";
import FlatListComp from "./FlatListComp";

export default function Index() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const styles = createStyles(theme, colorScheme);

  const Container = Platform.OS === "web" ? ScrollView : SafeAreaView;

  return (
    <Container
      style={styles.view}
      contentContainerStyle={
        Platform.OS === "web" ? styles.contentContainer : null
      }
    >
      <Text style={styles.title}>Gestionnaire de tâches</Text>

      <TextInputComp />

      <FlatListComp />
    </Container>
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
    },
    text: {
      color: theme.text,
      fontSize: 16,
    },
  });
}
