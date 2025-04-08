import React, { useRef, useState } from "react";
import {
	Dimensions,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Event } from "../constants/mockData";
import { useTheme } from "../themes/ThemeProvider";
import EventCard from "./EventCard";

interface EventCarouselProps {
	title: string;
	events: Event[];
	onEventPress: (id: string) => void;
	viewAllPress?: () => void;
}

const EventCarousel: React.FC<EventCarouselProps> = ({
	title,
	events,
	onEventPress,
	viewAllPress,
}) => {
	const scrollViewRef = useRef<ScrollView>(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const { colors, themeColors } = useTheme();
	const { width } = Dimensions.get("window");

	const handleScroll = (event: any) => {
		const contentOffsetX = event.nativeEvent.contentOffset.x;
		const newIndex = Math.round(contentOffsetX / width);
		setCurrentIndex(newIndex);
	};

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Text style={[styles.title, { color: colors.grandTitre }]}>
					{title}
				</Text>
				{viewAllPress && (
					<TouchableOpacity onPress={viewAllPress}>
						<Text style={[styles.viewAll, { color: colors.customBlue }]}>
							Voir tout
						</Text>
					</TouchableOpacity>
				)}
			</View>

			<ScrollView
				ref={scrollViewRef}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onScroll={handleScroll}
				scrollEventThrottle={16}
				contentContainerStyle={styles.scrollViewContent}
			>
				{events.map((event) => (
					<View key={event.id} style={styles.cardContainer}>
						<EventCard event={event} onPress={onEventPress} />
					</View>
				))}
			</ScrollView>

			<View style={styles.indicatorContainer}>
				{events.map((_, index) => (
					<View
						key={index}
						style={[
							styles.indicator,
							index === currentIndex
								? { backgroundColor: colors.customBlue, width: 20 }
								: { backgroundColor: colors.grisvif },
						]}
					/>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginVertical: 20,
	},
	headerContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		marginBottom: 15,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	viewAll: {
		fontSize: 14,
		fontWeight: "600",
	},
	scrollViewContent: {
		paddingHorizontal: 16,
	},
	cardContainer: {
		alignItems: "center",
	},
	indicatorContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 15,
	},
	indicator: {
		height: 8,
		width: 8,
		borderRadius: 4,
		marginHorizontal: 4,
	},
});

export default EventCarousel;
