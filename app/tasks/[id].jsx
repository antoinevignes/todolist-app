import { IconSymbol } from "@/components/ui/IconSymbol";
import { useTheme } from "@/contexts/ThemeContext";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditScreen() {
  const { id } = useLocalSearchParams();
  const [task, setTask] = useState({});
  const router = useRouter();
  const { theme, colorScheme, setColorScheme } = useTheme();
  const styles = createStyles(theme, colorScheme);

  const [loaded, error] = useFonts({
    Inter_500Medium,
  });

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const jsonValue = await AsyncStorage.getItem("TodoApp");
        const storageTasks = jsonValue !== null ? JSON.parse(jsonValue) : null;

        if (storageTasks && storageTasks.length) {
          const myTask = storageTasks.find((task) => task.id.toString() === id);
          setTask(myTask);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(id);
  }, [id]);

  const handleSave = async () => {
    try {
      const savedTask = { ...task, title: task.title };

      const jsonValue = await AsyncStorage.getItem("TodoApp");
      const storageTasks = jsonValue !== null ? JSON.parse(jsonValue) : null;

      if (storageTasks && storageTasks.length) {
        const otherTasks = storageTasks.filter(
          (task) => task.id !== savedTask.id
        );
        const allTasks = [...otherTasks, savedTask];
        await AsyncStorage.setItem("TodoApp", JSON.stringify(allTasks));
      } else {
        await AsyncStorage.setItem("TodoApp", JSON.stringify([savedTask]));
      }

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          maxLength={30}
          placeholder="Modifier"
          placeholderTextColor="gray"
          value={task?.title || ""}
          onChangeText={(text) => setTask((prev) => ({ ...prev, title: text }))}
        />

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

      <View style={styles.inputContainer}>
        <Pressable onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Sauvegarder</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/")}
          style={[styles.saveButton, { backgroundColor: "red" }]}
        >
          <Text style={[styles.saveButtonText, { color: "white" }]}>
            Annuler
          </Text>
        </Pressable>
      </View>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </SafeAreaView>
  );
}

function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      backgroundColor: theme.background,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      width: "100%",
      maxWidth: 1024,
      marginHorizontal: "auto",
      pointerEvents: "auto",
    },
    input: {
      flex: 1,
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      fontSize: 18,
      fontFamily: "Inter_500Medium",
      minWidth: 0,
      color: theme.text,
    },
    saveButton: {
      backgroundColor: theme.text,
      borderRadius: 5,
      padding: 10,
    },
    saveButtonText: {
      fontSize: 18,
      color: colorScheme === "dark" ? "black" : "white",
    },
  });
}
