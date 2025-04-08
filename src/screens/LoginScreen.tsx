import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
	Alert,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import CustomButton from "../components/CustomButton";
import { RootStackParamList } from "../navigation/types";
import { useTheme } from "../themes/ThemeProvider";
import ScreenWrapper from "./ScreenWrapper";

type LoginNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LoginScreen = () => {
	const { t } = useTranslation("doc");
	const navigation = useNavigation<LoginNavigationProp>();
	const { colors, themeColors } = useTheme();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleLogin = () => {
		if (!email || !password) {
			Alert.alert("Erreur", "Veuillez remplir tous les champs");
			return;
		}

		setLoading(true);

		// Simulate API call
		setTimeout(() => {
			setLoading(false);
			// Navigate to home on successful login
			navigation.navigate("Home");
		}, 1500);
	};

	const navigateToSignUp = () => {
		navigation.navigate("SignUp");
	};

	return (
		<ScreenWrapper>
			<SafeAreaView
				style={{ flex: 1, backgroundColor: themeColors.background }}
			>
				<View style={styles.container}>
					<View style={styles.headerContainer}>
						<Text style={[styles.title, { color: colors.grandTitre }]}>
							{t("login")}
						</Text>
					</View>

					<View style={styles.formContainer}>
						<View style={styles.inputContainer}>
							<Text style={[styles.label, { color: themeColors.text }]}>
								{t("email")}
							</Text>
							<TextInput
								style={[
									styles.input,
									{
										backgroundColor: colors.grisvif,
										color: themeColors.text,
										borderColor: colors.griclair,
									},
								]}
								value={email}
								onChangeText={setEmail}
								placeholder={t("email")}
								placeholderTextColor="gray"
								keyboardType="email-address"
								autoCapitalize="none"
							/>
						</View>

						<View style={styles.inputContainer}>
							<Text style={[styles.label, { color: themeColors.text }]}>
								{t("password")}
							</Text>
							<TextInput
								style={[
									styles.input,
									{
										backgroundColor: colors.grisvif,
										color: themeColors.text,
										borderColor: colors.griclair,
									},
								]}
								value={password}
								onChangeText={setPassword}
								placeholder={t("password")}
								placeholderTextColor="gray"
								secureTextEntry
							/>
						</View>

						<TouchableOpacity style={styles.forgotPasswordContainer}>
							<Text
								style={[styles.forgotPassword, { color: colors.customBlue }]}
							>
								{t("forgotPassword")}
							</Text>
						</TouchableOpacity>

						<CustomButton
							title={t("login")}
							onPress={handleLogin}
							loading={loading}
							style={styles.loginButton}
						/>

						<View style={styles.signUpContainer}>
							<Text style={{ color: themeColors.text }}>
								Vous n'avez pas de compte ?
							</Text>
							<TouchableOpacity onPress={navigateToSignUp}>
								<Text style={[styles.signUpText, { color: colors.customBlue }]}>
									{t("createAccount")}
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</SafeAreaView>
		</ScreenWrapper>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	headerContainer: {
		marginTop: 20,
		marginBottom: 40,
		alignItems: "center",
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
	},
	formContainer: {
		marginHorizontal: 16,
	},
	inputContainer: {
		marginBottom: 20,
	},
	label: {
		marginBottom: 8,
		fontSize: 16,
		fontWeight: "500",
	},
	input: {
		height: 50,
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 12,
		fontSize: 16,
	},
	forgotPasswordContainer: {
		alignSelf: "flex-end",
		marginBottom: 20,
	},
	forgotPassword: {
		fontSize: 14,
	},
	loginButton: {
		height: 50,
		marginTop: 10,
		marginBottom: 20,
	},
	signUpContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 20,
		gap: 5,
	},
	signUpText: {
		fontWeight: "bold",
	},
});

export default LoginScreen;
