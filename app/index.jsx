import { Platform, StyleSheet, Text } from "react-native";
import TextInputComp from "../components/TextInputComp";
import FlatListComp from "../components/FlatListComp";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import { useTheme } from "@/contexts/ThemeContext";
import { useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTask } from "@/contexts/TaskContext";
import { data } from "@/data/tasks";

export default function Index() {
  const { theme, colorScheme } = useTheme();
  const styles = createStyles(theme);

  const { tasks, setTasks } = useTask();

  const [loaded, error] = useFonts({
    Inter_500Medium,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("TodoApp");
        const storageTasks = jsonValue !== null ? JSON.parse(jsonValue) : null;

        if (storageTasks && storageTasks.length) {
          setTasks(storageTasks.sort((a, b) => b.id - a.id));
        } else {
          setTasks(data.sort((a, b) => b.id - a.id));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [data]);

  useEffect(() => {
    const storeData = async () => {
      try {
        const jsonValue = JSON.stringify(tasks);
        await AsyncStorage.setItem("TodoApp", jsonValue);
      } catch (error) {
        console.error(error);
      }
    };

    storeData();
  }, [tasks]);

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
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
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
