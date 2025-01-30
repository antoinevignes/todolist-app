import { IconSymbol } from "@/components/ui/IconSymbol";
import { useTask } from "@/contexts/TaskContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";

export default function FlatListComp() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { tasks, handleDelete, toggleTask } = useTask();

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <Text
        style={[styles.text, item.completed && styles.completedText]}
        onPress={() => toggleTask(item.id)}
      >
        {item.title}
      </Text>

      <Pressable onPress={() => handleDelete(item.id)} style={styles.button}>
        <IconSymbol name="trash" color={theme.background} />
      </Pressable>
    </View>
  );

  return (
    <Animated.FlatList
      contentContainerStyle={styles.flatListContent}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <Text style={styles.text}>Pas de tâches à faire...</Text>
      }
      keyExtractor={(item) => item.id}
      data={tasks}
      renderItem={renderItem}
      itemLayoutAnimation={LinearTransition}
      keyboardDismissMode="on-drag"
    />
  );
}

function createStyles(theme) {
  return StyleSheet.create({
    text: {
      color: theme.text,
      fontSize: 16,
      fontFamily: "Inter_500Medium",
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
      backgroundColor: theme.text,
    },
    completedText: {
      textDecorationLine: "line-through",
      color: "gray",
    },
  });
}
