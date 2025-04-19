import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
	CompositeNavigationProp,
	useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
	ActivityIndicator,
	FlatList,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import CustomButton from "../components/CustomButton";
import EventCard from "../components/EventCard";
import { Event } from "../constants/mockData";
import { MainTabParamList, RootStackParamList } from "../navigation/types";
import dbService from "../services/DatabaseService";
import { useTheme } from "../themes/ThemeProvider";
import ScreenWrapper from "./ScreenWrapper";

type EventsNavigationProp = CompositeNavigationProp<
	BottomTabNavigationProp<MainTabParamList, "Events">,
	NativeStackNavigationProp<RootStackParamList>
>;

const EventsScreen = () => {
	const { t } = useTranslation("doc");
	const navigation = useNavigation<EventsNavigationProp>();
	const { colors, themeColors } = useTheme();
	const [showFilter, setShowFilter] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [events, setEvents] = useState<Event[]>([]);
	const [loading, setLoading] = useState(true);

	// Fetch events when component mounts
	useEffect(() => {
		const fetchEvents = async () => {
			setLoading(true);
			try {
				// Get events from the database service
				const allEvents = await dbService.getAllEvents();
				setEvents(allEvents);
			} catch (error) {
				console.error("Error fetching events:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchEvents();
	}, []);

	const navigateToEventDetails = (id: string) => {
		navigation.navigate("EventDetails", { id });
	};

	const toggleFilter = () => {
		setShowFilter(!showFilter);
	};

	const filterEvents = () => {
		let filteredEvents = [...events];

		if (searchText) {
			filteredEvents = filteredEvents.filter(
				(event) =>
					event.title.toLowerCase().includes(searchText.toLowerCase()) ||
					event.description.toLowerCase().includes(searchText.toLowerCase())
			);
		}

		if (selectedCategory) {
			filteredEvents = filteredEvents.filter(
				(event) => event.category === selectedCategory
			);
		}

		return filteredEvents;
	};

	const categories = ["Musique", "Art", "Sport", "Marché", "Technologie"];

	return (
		<ScreenWrapper>
			<SafeAreaView
				style={{ flex: 1, backgroundColor: themeColors.background }}
			>
				<View style={styles.container}>
					<View style={styles.header}>
						<Text style={[styles.headerTitle, { color: colors.grandTitre }]}>
							{t("events")}
						</Text>
						<Text style={[styles.headerSubtitle, { color: themeColors.text }]}>
							{t("searchText")}
						</Text>
					</View>

					<View style={styles.searchContainer}>
						<TextInput
							style={[
								styles.searchInput,
								{
									backgroundColor: colors.grisvif,
									color: themeColors.text,
								},
							]}
							placeholder={t("search")}
							placeholderTextColor="gray"
							value={searchText}
							onChangeText={setSearchText}
						/>
						<TouchableOpacity
							style={[
								styles.filterButton,
								{ backgroundColor: colors.customBlue },
							]}
							onPress={toggleFilter}
						>
							<Text style={styles.filterButtonText}>{t("filter")}</Text>
						</TouchableOpacity>
					</View>

					{showFilter && (
						<View
							style={[
								styles.filterContainer,
								{ backgroundColor: colors.grisvif },
							]}
						>
							<Text style={[styles.filterTitle, { color: themeColors.text }]}>
								{t("filter")}
							</Text>
							<View style={styles.categoryButtons}>
								{categories.map((category) => (
									<TouchableOpacity
										key={category}
										style={[
											styles.categoryButton,
											{
												backgroundColor:
													selectedCategory === category
														? colors.customBlue
														: "transparent",
												borderColor: colors.customBlue,
											},
										]}
										onPress={() =>
											setSelectedCategory(
												selectedCategory === category ? null : category
											)
										}
									>
										<Text
											style={{
												color:
													selectedCategory === category
														? colors.white
														: colors.customBlue,
											}}
										>
											{category}
										</Text>
									</TouchableOpacity>
								))}
							</View>
							<View style={styles.filterActions}>
								<CustomButton
									title="Effacer"
									variant="outline"
									onPress={() => {
										setSelectedCategory(null);
										setSearchText("");
									}}
									style={styles.filterActionButton}
								/>
								<CustomButton
									title="Appliquer"
									onPress={toggleFilter}
									style={styles.filterActionButton}
								/>
							</View>
						</View>
					)}

					{loading ? (
						<View style={styles.loaderContainer}>
							<ActivityIndicator size="large" color={colors.customBlue} />
						</View>
					) : (
						<FlatList
							data={filterEvents()}
							keyExtractor={(item) => item.id}
							renderItem={({ item }) => (
								<EventCard event={item} onPress={navigateToEventDetails} />
							)}
							contentContainerStyle={styles.eventsList}
							ListEmptyComponent={
								<Text
									style={{
										color: themeColors.text,
										textAlign: "center",
										marginTop: 20,
									}}
								>
									No events found
								</Text>
							}
						/>
					)}
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
	header: {
		marginBottom: 20,
	},
	headerTitle: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 8,
	},
	headerSubtitle: {
		fontSize: 16,
	},
	loaderContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	searchContainer: {
		flexDirection: "row",
		marginBottom: 20,
	},
	searchInput: {
		flex: 1,
		height: 40,
		paddingHorizontal: 10,
		borderRadius: 8,
		marginRight: 10,
	},
	filterButton: {
		paddingHorizontal: 15,
		height: 40,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	filterButtonText: {
		color: "white",
		fontWeight: "bold",
	},
	filterContainer: {
		padding: 15,
		borderRadius: 8,
		marginBottom: 20,
	},
	filterTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 12,
	},
	categoryButtons: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginBottom: 15,
	},
	categoryButton: {
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 20,
		marginRight: 8,
		marginBottom: 8,
		borderWidth: 1,
	},
	filterActions: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	filterActionButton: {
		flex: 0.48,
	},
	eventsList: {
		alignItems: "center",
	},
});

export default EventsScreen;
