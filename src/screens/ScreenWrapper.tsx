import React from "react";
import { StyleSheet, View } from "react-native";
import MainLayout from "../components/MainLayout";
import { useTheme } from "../themes/ThemeProvider";

interface ScreenWrapperProps {
	children: React.ReactNode;
	onMenuPress?: () => void;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
	children,
	onMenuPress,
}) => {
	const { themeColors } = useTheme();

	return (
		<MainLayout onMenuPress={onMenuPress}>
			<View
				style={[styles.container, { backgroundColor: themeColors.background }]}
			>
				{children}
			</View>
		</MainLayout>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default ScreenWrapper;
