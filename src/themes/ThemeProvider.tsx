import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { colors } from "./colors";

type ThemeType = "light" | "dark";

interface ThemeContextType {
	theme: ThemeType;
	toggleTheme: () => void;
	colors: typeof colors;
	themeColors: {
		background: string;
		text: string;
	};
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [theme, setTheme] = useState<ThemeType>("light");

	useEffect(() => {
		loadTheme();
	}, []);

	const loadTheme = async () => {
		try {
			const savedTheme = await AsyncStorage.getItem("theme");
			if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
				setTheme(savedTheme);
			}
		} catch (error) {
			console.error("Failed to load theme", error);
		}
	};

	const toggleTheme = async () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		try {
			await AsyncStorage.setItem("theme", newTheme);
		} catch (error) {
			console.error("Failed to save theme", error);
		}
	};

	const themeColors = {
		background: colors.background[theme],
		text: colors.text[theme],
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme, colors, themeColors }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};
