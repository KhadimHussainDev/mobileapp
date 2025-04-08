import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
	CompositeNavigationProp,
	useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
	Alert,
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import CustomButton from "../components/CustomButton";
import { MainTabParamList, RootStackParamList } from "../navigation/types";
import { useTheme } from "../themes/ThemeProvider";
import ScreenWrapper from "./ScreenWrapper";

type ContactNavigationProp = CompositeNavigationProp<
	BottomTabNavigationProp<MainTabParamList, "Contact">,
	NativeStackNavigationProp<RootStackParamList>
>;

const ContactScreen = () => {
	const { t } = useTranslation("doc");
	const navigation = useNavigation<ContactNavigationProp>();
	const { colors, themeColors } = useTheme();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = () => {
		if (!name || !email || !message) {
			Alert.alert("Erreur", "Veuillez remplir tous les champs");
			return;
		}

		setLoading(true);

		// Simulate API call
		setTimeout(() => {
			setLoading(false);
			Alert.alert(
				"Succès",
				"Votre message a été envoyé. Nous vous contacterons bientôt.",
				[
					{
						text: "OK",
						onPress: () => {
							// Reset form
							setName("");
							setEmail("");
							setMessage("");
						},
					},
				]
			);
		}, 1500);
	};

	return (
		<ScreenWrapper>
			<SafeAreaView
				style={{ flex: 1, backgroundColor: themeColors.background }}
			>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					style={{ flex: 1 }}
				>
					<ScrollView style={styles.container}>
						<View style={styles.headerContainer}>
							<Text style={[styles.title, { color: colors.grandTitre }]}>
								{t("contact")}
							</Text>
							<Text style={[styles.subtitle, { color: themeColors.text }]}>
								Contactez-nous pour toute question ou suggestion
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
									Message
								</Text>
								<TextInput
									style={[
										styles.textArea,
										{
											backgroundColor: colors.grisvif,
											color: themeColors.text,
											borderColor: colors.griclair,
										},
									]}
									value={message}
									onChangeText={setMessage}
									placeholder="Votre message"
									placeholderTextColor="gray"
									multiline
									numberOfLines={6}
									textAlignVertical="top"
								/>
							</View>

							<CustomButton
								title={t("submit")}
								onPress={handleSubmit}
								loading={loading}
								style={styles.submitButton}
							/>
						</View>

						<View style={styles.contactInfoContainer}>
							<Text
								style={[styles.contactInfoTitle, { color: colors.grandTitre }]}
							>
								Informations de contact
							</Text>

							<View style={styles.contactInfoItem}>
								<Text
									style={[styles.contactInfoLabel, { color: themeColors.text }]}
								>
									Adresse:
								</Text>
								<Text
									style={[styles.contactInfoText, { color: themeColors.text }]}
								>
									123 Rue Principale, Ottawa, ON K1P 1J1
								</Text>
							</View>

							<View style={styles.contactInfoItem}>
								<Text
									style={[styles.contactInfoLabel, { color: themeColors.text }]}
								>
									Téléphone:
								</Text>
								<Text
									style={[styles.contactInfoText, { color: themeColors.text }]}
								>
									+1 (613) 123-4567
								</Text>
							</View>

							<View style={styles.contactInfoItem}>
								<Text
									style={[styles.contactInfoLabel, { color: themeColors.text }]}
								>
									Email:
								</Text>
								<Text
									style={[styles.contactInfoText, { color: themeColors.text }]}
								>
									contact@ottawa-events.ca
								</Text>
							</View>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
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
		marginVertical: 20,
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 10,
	},
	subtitle: {
		fontSize: 16,
	},
	formContainer: {
		marginTop: 20,
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
	textArea: {
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingTop: 12,
		fontSize: 16,
		minHeight: 120,
	},
	submitButton: {
		height: 50,
		marginVertical: 20,
	},
	contactInfoContainer: {
		marginTop: 20,
		marginBottom: 40,
	},
	contactInfoTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 15,
	},
	contactInfoItem: {
		marginBottom: 10,
	},
	contactInfoLabel: {
		fontWeight: "bold",
		marginBottom: 4,
	},
	contactInfoText: {
		fontSize: 16,
	},
});

export default ContactScreen;
