import React, { useEffect, useState } from "react";
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

	// Update sidebar when onMenuPress is called from parent
	useEffect(() => {
		if (onMenuPress) {
			const originalOnMenuPress = onMenuPress;
			onMenuPress = () => {
				toggleSidebar();
				originalOnMenuPress();
			};
		}
	}, [onMenuPress]);

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
