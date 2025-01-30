import { Colors } from "@/constants/Colors";
import { useTask } from "@/contexts/TaskContext";
import { Button, View, TextInput, Appearance, StyleSheet } from "react-native";

export default function TextInputComp() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const styles = createStyles(theme, colorScheme);

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
      <Button title="Ajouter" onPress={handleAddTask} />
    </View>
  );
}

function createStyles(theme) {
  return StyleSheet.create({
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
    },
  });
}
