import { useTask } from "@/contexts/TaskContext";
import { useTheme } from "@/contexts/ThemeContext";
import { View, TextInput, StyleSheet, Pressable, Text } from "react-native";
import { IconSymbol } from "./ui/IconSymbol";

export default function TextInputComp() {
  const { theme, colorScheme, setColorScheme } = useTheme();
  const styles = createStyles(theme);

  const { input, setInput, handleAddTask } = useTask();

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Ajouter une tâche"
        value={input}
        onChangeText={(text) => {
          setInput(text);
        }}
        onSubmitEditing={handleAddTask}
      />
      <Pressable onPress={handleAddTask} style={styles.button}>
        <Text style={styles.text}>Ajouter</Text>
      </Pressable>
      <Pressable
        onPress={() =>
          setColorScheme(colorScheme === "light" ? "dark" : "light")
        }
      >
        <IconSymbol
          name={colorScheme === "dark" ? "sun.max.fill" : "moon.fill"}
          color={theme.text}
        />
      </Pressable>
    </View>
  );
}

function createStyles(theme) {
  return StyleSheet.create({
    text: {
      color: theme.background,
      fontSize: 16,
      fontFamily: "Inter_500Medium",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
    },
    textInput: {
      color: theme.text,
      padding: 10,
      borderStyle: "solid",
      borderColor: theme.text,
      borderWidth: 1,
      borderRadius: 5,
      width: 150,
      fontFamily: "Inter_500Medium",
    },
    button: {
      padding: 8,
      borderRadius: 5,
      backgroundColor: theme.text,
    },
  });
}
