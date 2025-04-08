import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { useTranslation } from "react-i18next";
import {
	Platform,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { RootStackParamList } from "../navigation/types";
import { useTheme } from "../themes/ThemeProvider";

type CustomHeaderProps = {
	title: string;
	showBackButton?: boolean;
	onBackPress?: () => void;
	onMenuPress?: () => void;
};

const CustomHeader: React.FC<CustomHeaderProps> = ({
	title,
	showBackButton = false,
	onBackPress,
	onMenuPress,
}) => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const { t } = useTranslation("header");
	const { colors, theme, toggleTheme } = useTheme();

	const handleLogin = () => {
		navigation.navigate("Login");
	};

	const handleSignUp = () => {
		navigation.navigate("SignUp");
	};

	const handleMenuPress = () => {
		if (onMenuPress) {
			onMenuPress();
		}
	};

	return (
		<View
			style={[styles.headerContainer, { backgroundColor: colors.customBlue }]}
		>
			<StatusBar
				barStyle="light-content"
				backgroundColor={colors.customBlue}
				translucent={true}
			/>
			<View style={styles.container}>
				<View style={styles.leftContainer}>
					{showBackButton ? (
						<TouchableOpacity onPress={onBackPress} style={styles.iconButton}>
							<Icon name="arrow-back" size={24} color={colors.white} />
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							onPress={handleMenuPress}
							style={styles.menuButton}
						>
							<Icon name="menu" size={26} color={colors.white} />
						</TouchableOpacity>
					)}
					<Text style={styles.title}>{title}</Text>
				</View>

				<View style={styles.rightContainer}>
					<TouchableOpacity style={styles.iconButton} onPress={toggleTheme}>
						<Icon
							name={theme === "dark" ? "sunny" : "moon"}
							size={22}
							color={colors.white}
						/>
					</TouchableOpacity>

					<TouchableOpacity style={styles.authButton} onPress={handleLogin}>
						<Text style={styles.authButtonText}>{t("login")}</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.authButton, styles.signUpButton]}
						onPress={handleSignUp}
					>
						<Text style={styles.authButtonText}>{t("signup")}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	headerContainer: {
		paddingTop: Platform.OS === "ios" ? 44 : StatusBar.currentHeight,
	},
	container: {
		height: 60,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		elevation: 4,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 2,
	},
	leftContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	iconButton: {
		marginRight: 16,
		padding: 4,
	},
	menuButton: {
		marginRight: 16,
		padding: 4,
		borderRadius: 4,
		backgroundColor: "rgba(255, 255, 255, 0.1)",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		color: "white",
	},
	rightContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	authButton: {
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 4,
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		marginLeft: 8,
	},
	signUpButton: {
		backgroundColor: "rgba(255, 255, 255, 0.3)",
	},
	authButtonText: {
		color: "white",
		fontWeight: "500",
		fontSize: 14,
	},
});

export default CustomHeader;
