import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import TypographyComponent from "@components/Typography.component";
import { Mission } from "@hooks/useMissionsScreen";
import { colors } from "@theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

type MissionRowProps = {
	mission: Mission;
	index: number;
};

const MissionRow = ({ mission, index }: MissionRowProps) => {
	const { t } = useTranslation();
	const progress = mission.progressTotal
		? mission.progressCurrent / mission.progressTotal
		: 0;
	const isCompleted = mission.completed === true;

	return (
		<Animated.View
			entering={FadeInRight.delay(index * 80)
				.duration(400)
				.springify()}
			style={[styles.missionRow, isCompleted && styles.missionRowCompleted]}
		>
			{/* Icon */}
			<View
				style={[
					styles.missionIconBox,
					isCompleted && styles.missionIconBoxCompleted,
				]}
			>
				{isCompleted ? (
					<TypographyComponent style={styles.missionIcon}>✓</TypographyComponent>
				) : (
					<TypographyComponent style={styles.missionIcon}>
						{mission.icon}
					</TypographyComponent>
				)}
			</View>

			{/* Content */}
			<View style={styles.missionContent}>
				<TypographyComponent
					variant="h6"
					style={[styles.missionTitle, isCompleted && styles.missionTitleCompleted]}
				>
					{mission.title}
				</TypographyComponent>
				{isCompleted ? (
					<View style={styles.completedBar}>
						<View style={styles.completedBarFill} />
						<TypographyComponent
							variant="labelSmall"
							style={styles.completedLabel}
						>
							{t("missions.completed")}
						</TypographyComponent>
					</View>
				) : (
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
				)}
			</View>

			{/* XP Badge */}
			<View style={[styles.xpBadge, isCompleted && styles.xpBadgeCompleted]}>
				<TypographyComponent style={styles.xpFlame}>
					{isCompleted ? "✓" : <Ionicons name="flame" size={24} color={colors.primary} />}
				</TypographyComponent>
				<TypographyComponent
					variant="labelSmall"
					style={[styles.xpText, isCompleted && styles.xpTextCompleted]}
				>
					{t("missions.xp", { xp: mission.rewardXP })}
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
	missionRowCompleted: {
		backgroundColor: colors.missionCompleted.background,
		borderWidth: 1,
		borderColor: colors.missionCompleted.border,
		shadowColor: colors.missionCompleted.accent,
		shadowOpacity: 0.08,
	},
	missionIconBox: {
		width: 60,
		height: 60,
		borderRadius: 14,
		backgroundColor: colors.primaryLight,
		justifyContent: "center",
		alignItems: "center",
		flexShrink: 0,
	},
	missionIconBoxCompleted: {
		backgroundColor: colors.missionCompleted.iconBackground,
	},
	missionIcon: {
		fontSize: 20,
	},
	missionContent: {
		flex: 1,
		gap: 8,
	},
	missionTitle: {
		color: colors.text.primary,
	},
	missionTitleCompleted: {
		color: colors.text.secondary,
		textDecorationLine: "line-through",
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
	completedBar: {
		height: 24,
		backgroundColor: colors.missionCompleted.border,
		borderRadius: 12,
		overflow: "hidden",
		justifyContent: "center",
		position: "relative",
	},
	completedBarFill: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: colors.missionCompleted.accent,
		borderRadius: 12,
		opacity: 0.4,
	},
	completedLabel: {
		position: "absolute",
		width: "100%",
		textAlign: "center",
		color: colors.missionCompleted.text,
		fontWeight: "700",
	},
	xpBadge: {
		alignItems: "center",
		flexShrink: 0,
		gap: 2,
	},
	xpBadgeCompleted: {
		opacity: 0.9,
	},
	xpFlame: {
		fontSize: 24,
	},
	xpText: {
		color: colors.text.tertiary,
		fontWeight: "700",
	},
	xpTextCompleted: {
		color: colors.missionCompleted.text,
	},
});

export default MissionRow;
