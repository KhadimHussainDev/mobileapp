import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../themes/ThemeProvider";
import Sidebar from "./Sidebar";

interface MainLayoutProps {
	children: React.ReactNode;
	onMenuPress?: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, onMenuPress }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const { themeColors } = useTheme();

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const handleMenuPress = () => {
		toggleSidebar();
		if (onMenuPress) {
			onMenuPress();
		}
	};

	return (
		<View
			style={[styles.container, { backgroundColor: themeColors.background }]}
		>
			{children}

			<Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: "relative",
	},
});

export default MainLayout;
