import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useTask } from "@/contexts/TaskContext";
import {
  Appearance,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function FlatListComp() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const styles = createStyles(theme, colorScheme);

  const { tasks, handleDelete, toggleTask } = useTask();

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <Text
        style={[styles.text, item.completed && styles.completedText]}
        onPress={() => toggleTask(item.id)}
      >
        {item.title}
      </Text>

      <Pressable
        onPress={() => handleDelete(item.id)}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "lightgray" : "white",
          },
          styles.button,
        ]}
      >
        <IconSymbol name="trash" color={theme.background} />
      </Pressable>
    </View>
  );

  return (
    <FlatList
      contentContainerStyle={styles.flatListContent}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <Text style={styles.text}>Pas de tâches à faire...</Text>
      }
      keyExtractor={(item) => item.id}
      data={tasks}
      renderItem={renderItem}
    />
  );
}

function createStyles(theme) {
  return StyleSheet.create({
    text: {
      color: theme.text,
      fontSize: 16,
    },
    flatListContent: {
      alignItems: "center",
      padding: 40,
    },
    taskItem: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.text,
      width: 300,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    },
    button: {
      padding: 4,
      borderRadius: 5,
    },
    completedText: {
      textDecorationLine: "line-through",
      color: "gray",
    },
  });
}
