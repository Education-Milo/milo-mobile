import MissionRow from "@components/missions/MissionRow.component";
import TypographyComponent from "@components/Typography.component";
import { Mission } from "@hooks/useMissionsScreen";
import { colors } from "@theme/colors";
import React from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";

interface HomeMissionsProps {
	dailyMissions: Mission[];
	completedMissions: number;
	totalMissions: number;
}

const HomeMissions = ({
	dailyMissions,
	completedMissions,
	totalMissions,
}: HomeMissionsProps) => {
	const { t } = useTranslation();

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TypographyComponent variant="h4" color={colors.primary}>
					{t("home.missions.title")}
				</TypographyComponent>
				<View style={styles.badge}>
					<TypographyComponent variant="labelSmall" color={colors.progress.fill}>
						{completedMissions}/{totalMissions}
					</TypographyComponent>
				</View>
			</View>
			{dailyMissions.map((mission) => (
				<MissionRow
					key={mission.id}
					mission={mission}
					index={dailyMissions.findIndex((m) => m.id === mission.id)}
				/>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
		marginBottom: 10,
		gap: 12,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 12,
	},
    badge: {
        backgroundColor: colors.primaryLight,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
    },
});

export default HomeMissions;
