import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import TypographyComponent from "@components/Typography.component";
import { Mission } from "@hooks/useMissionsScreen";
import { colors } from "@theme/colors";

type MissionRowProps = {
	mission: Mission;
	index: number;
};

const MissionRow = ({ mission, index }: MissionRowProps) => {
	const progress = mission.progressCurrent / mission.progressTotal;

	return (
		<Animated.View
			entering={FadeInRight.delay(index * 80)
				.duration(400)
				.springify()}
			style={styles.missionRow}
		>
			{/* Icon */}
			<View style={styles.missionIconBox}>
				<TypographyComponent style={styles.missionIcon}>
					{mission.icon}
				</TypographyComponent>
			</View>

			{/* Content */}
			<View style={styles.missionContent}>
				<TypographyComponent variant="h6" style={styles.missionTitle}>
					{mission.title}
				</TypographyComponent>
				<View style={styles.progressBarBg}>
					<View
						style={[
							styles.progressBarFill,
							{ width: `${Math.min(progress * 100, 100)}%` },
						]}
					/>
					<TypographyComponent
						variant="labelSmall"
						style={styles.progressLabel}
					>
						{mission.progressCurrent}/{mission.progressTotal}
					</TypographyComponent>
				</View>
			</View>

			{/* XP Badge */}
			<View style={styles.xpBadge}>
				<TypographyComponent style={styles.xpFlame}>
					{mission.completed ? "🥇" : "🔥"}
				</TypographyComponent>
				<TypographyComponent variant="labelSmall" style={styles.xpText}>
					XP
				</TypographyComponent>
			</View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	missionRow: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.card,
		borderRadius: 18,
		padding: 16,
		shadowColor: colors.primary,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 3,
		gap: 14,
	},
	missionIconBox: {
		width: 52,
		height: 52,
		borderRadius: 14,
		backgroundColor: colors.primaryLight,
		justifyContent: "center",
		alignItems: "center",
		flexShrink: 0,
	},
	missionIcon: {
		fontSize: 28,
	},
	missionContent: {
		flex: 1,
		gap: 8,
	},
	missionTitle: {
		color: colors.text.primary,
	},
	progressBarBg: {
		height: 24,
		backgroundColor: colors.progress.background,
		borderRadius: 12,
		overflow: "hidden",
		justifyContent: "center",
		position: "relative",
	},
	progressBarFill: {
		position: "absolute",
		left: 0,
		top: 0,
		bottom: 0,
		backgroundColor: colors.progress.fill,
		borderRadius: 12,
	},
	progressLabel: {
		position: "absolute",
		width: "100%",
		textAlign: "center",
		color: colors.text.primary,
		fontWeight: "700",
	},
	xpBadge: {
		alignItems: "center",
		flexShrink: 0,
		gap: 2,
	},
	xpFlame: {
		fontSize: 24,
	},
	xpText: {
		color: colors.text.tertiary,
		fontWeight: "700",
	},
});

export default MissionRow;
