import { createContext, useContext, useState } from "react";
import { Appearance } from "react-native";
import { Colors } from "../constants/Colors";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <ThemeContext.Provider value={{ colorScheme, setColorScheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
