import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
	Alert,
	SafeAreaView,
	ScrollView,
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

type SignUpNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SignUpScreen = () => {
	const { t } = useTranslation("doc");
	const navigation = useNavigation<SignUpNavigationProp>();
	const { colors, themeColors } = useTheme();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSignUp = () => {
		if (!name || !email || !password || !confirmPassword) {
			Alert.alert("Erreur", "Veuillez remplir tous les champs");
			return;
		}

		if (password !== confirmPassword) {
			Alert.alert("Erreur", "Les mots de passe ne correspondent pas");
			return;
		}

		setLoading(true);

		// Simulate API call
		setTimeout(() => {
			setLoading(false);
			// Navigate to home on successful sign up
			navigation.navigate("Home");
		}, 1500);
	};

	const navigateToLogin = () => {
		navigation.navigate("Login");
	};

	return (
		<ScreenWrapper>
			<SafeAreaView
				style={{ flex: 1, backgroundColor: themeColors.background }}
			>
				<ScrollView style={styles.container}>
					<View style={styles.headerContainer}>
						<Text style={[styles.title, { color: colors.grandTitre }]}>
							{t("createAccount")}
						</Text>
					</View>

					<View style={styles.formContainer}>
						<View style={styles.inputContainer}>
							<Text style={[styles.label, { color: themeColors.text }]}>
								{t("name")}
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
								value={name}
								onChangeText={setName}
								placeholder={t("name")}
								placeholderTextColor="gray"
								autoCapitalize="words"
							/>
						</View>

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

						<View style={styles.inputContainer}>
							<Text style={[styles.label, { color: themeColors.text }]}>
								{t("confirmPassword")}
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
								value={confirmPassword}
								onChangeText={setConfirmPassword}
								placeholder={t("confirmPassword")}
								placeholderTextColor="gray"
								secureTextEntry
							/>
						</View>

						<CustomButton
							title={t("register")}
							onPress={handleSignUp}
							loading={loading}
							style={styles.signUpButton}
						/>

						<View style={styles.loginContainer}>
							<Text style={{ color: themeColors.text }}>
								Vous avez déjà un compte ?
							</Text>
							<TouchableOpacity onPress={navigateToLogin}>
								<Text style={[styles.loginText, { color: colors.customBlue }]}>
									{t("login")}
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
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
	signUpButton: {
		height: 50,
		marginTop: 10,
		marginBottom: 20,
	},
	loginContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 20,
		marginBottom: 30,
		gap: 5,
	},
	loginText: {
		fontWeight: "bold",
	},
});

export default SignUpScreen;
