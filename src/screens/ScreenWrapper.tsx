import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../themes/ThemeProvider";

interface ScreenWrapperProps {
	children: React.ReactNode;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children }) => {
	const { themeColors } = useTheme();

	return (
		<View
			style={[styles.container, { backgroundColor: themeColors.background }]}
		>
			{children}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default ScreenWrapper;
