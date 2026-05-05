// src/shared/context/ThemeContext.tsx

import React, { createContext, useContext } from "react";
import { View } from "react-native";
import { useColorScheme } from "nativewind";
import { themes } from "@/src/utils/color-theme";

interface ThemeContextType {
  theme: "light" | "dark";
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { colorScheme } = useColorScheme();
  const theme = (colorScheme as "light" | "dark") || "light";

  return (
    <ThemeContext.Provider value={{ theme }}>
      <View style={themes[theme]} className="flex-1">
        {children}
      </View>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
};