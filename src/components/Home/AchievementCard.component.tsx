import React from "react";
import { View, StyleSheet, Image, ImageSourcePropType } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import TypographyComponent from "@components/Typography.component";
import { colors } from "@theme/colors";

export interface Achievement {
	id: number;
	title: string;
	date: string;
	icon: string;
	image?: ImageSourcePropType;
}

interface AchievementCardProps {
	achievement: Achievement;
	index: number;
}

const AchievementCard = ({ achievement, index }: AchievementCardProps) => {
	return (
		<Animated.View
			entering={FadeInDown.delay(index * 80)
				.duration(400)
				.springify()}
			style={styles.card}
		>
			<View style={styles.imageContainer}>
				{achievement.image ? (
					<Image source={achievement.image} />
				) : (
					<TypographyComponent style={styles.iconEmoji}>
						{achievement.icon}
					</TypographyComponent>
				)}
			</View>

			<TypographyComponent
				variant="labelSmall"
				style={styles.title}
				numberOfLines={2}
			>
				{achievement.title}
			</TypographyComponent>

			<TypographyComponent
				variant="labelSmall"
				color={colors.text.tertiary}
				style={styles.date}
			>
				{achievement.date}
			</TypographyComponent>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	card: {
		flex: 1,
		alignItems: "center",
		gap: 6,
	},
	imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.primary + '80',
    },
	iconEmoji: {
		fontSize: 20,
	},
	title: {
		textAlign: "center",
		fontWeight: "700",
		color: colors.text.primary,
	},
	date: {
		textAlign: "center",
		fontSize: 11,
	},
});

export default AchievementCard;
