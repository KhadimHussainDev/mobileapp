import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { useTranslation } from "react-i18next";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { changeLanguage } from "../i18n/i18n";
import { RootStackParamList } from "../navigation/types";
import { useTheme } from "../themes/ThemeProvider";

interface SidebarProps {
	isOpen: boolean;
	onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const { t, i18n } = useTranslation("header");
	const { colors, themeColors, theme, toggleTheme } = useTheme();

	const menuItems = [
		{ name: "Home", label: t("home"), icon: "home" },
		{ name: "Events", label: t("event"), icon: "calendar" },
		{ name: "HelpCenter", label: t("assist"), icon: "help-circle" },
		{ name: "Contact", label: t("contact"), icon: "mail" },
	];

	const navigateTo = (screen: keyof RootStackParamList) => {
		onClose();
		navigation.navigate(screen);
	};

	const handleLanguageChange = async (lang: string) => {
		await changeLanguage(lang);
	};

	if (!isOpen) {
		return null;
	}

	return (
		<View style={styles.container}>
			<View
				style={[styles.sidebar, { backgroundColor: themeColors.background }]}
			>
				<View style={[styles.header, { backgroundColor: colors.customBlue }]}>
					<Text style={styles.headerTitle}>Ottawa Events</Text>
					<TouchableOpacity onPress={onClose} style={styles.closeButton}>
						<Icon name="close" size={24} color="white" />
					</TouchableOpacity>
				</View>

				<ScrollView style={styles.menuContainer}>
					{menuItems.map((item, index) => (
						<TouchableOpacity
							key={index}
							style={styles.menuItem}
							onPress={() => navigateTo(item.name as keyof RootStackParamList)}
						>
							<Icon name={item.icon} size={22} color={colors.customBlue} />
							<Text style={[styles.menuItemText, { color: themeColors.text }]}>
								{item.label}
							</Text>
						</TouchableOpacity>
					))}

					<View style={styles.divider} />

					<TouchableOpacity
						style={styles.menuItem}
						onPress={() => navigateTo("Login")}
					>
						<Icon name="log-in" size={22} color={colors.customBlue} />
						<Text style={[styles.menuItemText, { color: themeColors.text }]}>
							{t("login")}
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.menuItem}
						onPress={() => navigateTo("SignUp")}
					>
						<Icon name="person-add" size={22} color={colors.customBlue} />
						<Text style={[styles.menuItemText, { color: themeColors.text }]}>
							{t("signup")}
						</Text>
					</TouchableOpacity>

					<View style={styles.divider} />

					<View style={styles.languageContainer}>
						<TouchableOpacity
							style={[
								styles.languageButton,
								i18n.language === "en" && styles.activeLanguage,
							]}
							onPress={() => handleLanguageChange("en")}
						>
							<Text
								style={[
									styles.languageText,
									{
										color: i18n.language === "en" ? "white" : colors.customBlue,
									},
								]}
							>
								English
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								styles.languageButton,
								i18n.language === "fr" && styles.activeLanguage,
							]}
							onPress={() => handleLanguageChange("fr")}
						>
							<Text
								style={[
									styles.languageText,
									{
										color: i18n.language === "fr" ? "white" : colors.customBlue,
									},
								]}
							>
								Français
							</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.divider} />

					<TouchableOpacity style={styles.menuItem} onPress={toggleTheme}>
						<Icon
							name={theme === "dark" ? "sunny" : "moon"}
							size={22}
							color={colors.customBlue}
						/>
						<Text style={[styles.menuItemText, { color: themeColors.text }]}>
							{theme === "dark" ? "Light Mode" : "Dark Mode"}
						</Text>
					</TouchableOpacity>
				</ScrollView>
			</View>

			<TouchableOpacity
				style={styles.overlay}
				onPress={onClose}
				activeOpacity={1}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 100,
		flexDirection: "row",
	},
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	sidebar: {
		width: 280,
		height: "100%",
		elevation: 10,
		shadowColor: "#000",
		shadowOffset: { width: 5, height: 0 },
		shadowOpacity: 0.3,
		shadowRadius: 5,
	},
	header: {
		paddingVertical: 20,
		paddingHorizontal: 16,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "white",
	},
	closeButton: {
		padding: 5,
	},
	menuContainer: {
		paddingTop: 20,
		paddingHorizontal: 16,
	},
	menuItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 15,
	},
	menuItemText: {
		fontSize: 16,
		marginLeft: 16,
	},
	divider: {
		height: 1,
		backgroundColor: "#E5E7EB",
		marginVertical: 15,
	},
	languageContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 15,
	},
	languageButton: {
		flex: 1,
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 8,
		marginHorizontal: 4,
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#E5E7EB",
	},
	activeLanguage: {
		backgroundColor: "#3B82F6",
		borderColor: "#3B82F6",
	},
	languageText: {
		fontSize: 14,
		fontWeight: "500",
	},
});

export default Sidebar;
