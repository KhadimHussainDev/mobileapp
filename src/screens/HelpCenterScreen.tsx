import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
	CompositeNavigationProp,
	useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import CustomButton from "../components/CustomButton";
import { MainTabParamList, RootStackParamList } from "../navigation/types";
import { useTheme } from "../themes/ThemeProvider";
import ScreenWrapper from "./ScreenWrapper";

type HelpCenterNavigationProp = CompositeNavigationProp<
	BottomTabNavigationProp<MainTabParamList, "HelpCenter">,
	NativeStackNavigationProp<RootStackParamList>
>;

interface FAQItem {
	question: string;
	answer: string;
}

const HelpCenterScreen = () => {
	const { t } = useTranslation("doc");
	const navigation = useNavigation<HelpCenterNavigationProp>();
	const { colors, themeColors } = useTheme();
	const [expandedItem, setExpandedItem] = useState<number | null>(null);
	const [searchQuery, setSearchQuery] = useState("");

	const toggleItem = (index: number) => {
		setExpandedItem(expandedItem === index ? null : index);
	};

	const navigateToContact = () => {
		navigation.navigate("Contact");
	};

	const faqItems: FAQItem[] = [
		{
			question: "Comment puis-je m'inscrire à un événement ?",
			answer:
				"Pour vous inscrire à un événement, visitez la page détaillée de l'événement et cliquez sur le bouton 'S'inscrire'. Suivez les instructions pour compléter votre inscription. Certains événements peuvent nécessiter un paiement préalable.",
		},
		{
			question: "Comment puis-je annuler mon inscription ?",
			answer:
				"Pour annuler votre inscription, connectez-vous à votre compte, accédez à 'Mes événements' et sélectionnez l'événement que vous souhaitez annuler. Cliquez sur 'Annuler l'inscription'. Notez que certains événements peuvent avoir des politiques d'annulation spécifiques.",
		},
		{
			question: "Comment puis-je contacter l'organisateur d'un événement ?",
			answer:
				"Vous pouvez contacter l'organisateur en visitant la page de l'événement et en cliquant sur le nom de l'organisateur. Vous y trouverez ses coordonnées. Vous pouvez également nous contacter directement et nous vous mettrons en relation avec l'organisateur.",
		},
		{
			question: "Comment puis-je organiser mon propre événement ?",
			answer:
				"Pour organiser votre propre événement, vous devez créer un compte organisateur. Après votre inscription, vous pourrez accéder au tableau de bord des organisateurs où vous pourrez créer et gérer vos événements.",
		},
		{
			question: "Comment puis-je trouver des événements près de chez moi ?",
			answer:
				"Utilisez la fonction de recherche et filtrez les résultats par lieu. Vous pouvez également activer la géolocalisation dans les paramètres de l'application pour voir automatiquement les événements proches de votre position.",
		},
	];

	const filteredFAQs = faqItems.filter(
		(item) =>
			item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.answer.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<ScreenWrapper>
			<SafeAreaView
				style={{ flex: 1, backgroundColor: themeColors.background }}
			>
				<ScrollView style={styles.container}>
					<View style={styles.headerContainer}>
						<Text style={[styles.title, { color: colors.grandTitre }]}>
							{t("assist")}
						</Text>
						<Text style={[styles.subtitle, { color: themeColors.text }]}>
							Trouvez des réponses à vos questions
						</Text>
					</View>

					<View style={styles.searchContainer}>
						<TextInput
							style={[
								styles.searchInput,
								{
									backgroundColor: colors.grisvif,
									color: themeColors.text,
									borderColor: colors.griclair,
								},
							]}
							value={searchQuery}
							onChangeText={setSearchQuery}
							placeholder="Rechercher une question..."
							placeholderTextColor="gray"
						/>
					</View>

					<View style={styles.faqContainer}>
						<Text style={[styles.sectionTitle, { color: colors.grandTitre }]}>
							{t("questions")}
						</Text>

						{filteredFAQs.length > 0 ? (
							filteredFAQs.map((item, index) => (
								<View key={index} style={styles.faqItem}>
									<TouchableOpacity
										style={[
											styles.questionContainer,
											{
												backgroundColor:
													expandedItem === index
														? colors.customBlue
														: colors.grisvif,
											},
										]}
										onPress={() => toggleItem(index)}
									>
										<Text
											style={[
												styles.question,
												{
													color:
														expandedItem === index
															? colors.white
															: themeColors.text,
												},
											]}
										>
											{item.question}
										</Text>
									</TouchableOpacity>

									{expandedItem === index && (
										<View
											style={[
												styles.answerContainer,
												{ backgroundColor: themeColors.background },
											]}
										>
											<Text
												style={[styles.answer, { color: themeColors.text }]}
											>
												{item.answer}
											</Text>
										</View>
									)}
								</View>
							))
						) : (
							<Text
								style={{
									color: themeColors.text,
									textAlign: "center",
									marginTop: 20,
								}}
							>
								Aucun résultat trouvé pour "{searchQuery}"
							</Text>
						)}
					</View>

					<View
						style={[styles.contactSection, { backgroundColor: colors.grisvif }]}
					>
						<Text style={[styles.contactTitle, { color: colors.grandTitre }]}>
							Vous ne trouvez pas votre réponse ?
						</Text>
						<Text style={[styles.contactText, { color: themeColors.text }]}>
							N'hésitez pas à nous contacter directement pour obtenir de l'aide
							personnalisée.
						</Text>
						<CustomButton
							title={t("contact")}
							onPress={navigateToContact}
							style={styles.contactButton}
						/>
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
	searchContainer: {
		marginBottom: 20,
	},
	searchInput: {
		height: 50,
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 12,
		fontSize: 16,
	},
	faqContainer: {
		marginBottom: 30,
	},
	sectionTitle: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 15,
	},
	faqItem: {
		marginBottom: 15,
		borderRadius: 0.5,
		overflow: "hidden",
	},
	questionContainer: {
		padding: 15,
		borderRadius: 8,
	},
	question: {
		fontSize: 16,
		fontWeight: "600",
	},
	answerContainer: {
		padding: 15,
		borderWidth: 1,
		borderColor: "#E5E7EB",
		borderBottomLeftRadius: 8,
		borderBottomRightRadius: 8,
	},
	answer: {
		fontSize: 16,
		lineHeight: 24,
	},
	contactSection: {
		padding: 20,
		borderRadius: 10,
		marginBottom: 30,
		alignItems: "center",
	},
	contactTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
		textAlign: "center",
	},
	contactText: {
		textAlign: "center",
		marginBottom: 20,
	},
	contactButton: {
		minWidth: 200,
	},
});

export default HelpCenterScreen;
