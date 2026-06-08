import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TypographyComponent from "@shared/components/Typography.component";
import { colors } from "@shared/theme/colors";

interface DuelScreenHeaderProps {
	onRandomMatch: () => void;
	onChallengeModal: () => void;
}

const DuelScreenHeader = ({
	onRandomMatch,
	onChallengeModal,
}: DuelScreenHeaderProps) => {
	return (
		<View>
			{/* Titre */}
			<View style={styles.header}>
				<TypographyComponent
					variant="h2"
					style={{ textAlign: "center", marginBottom: 4 }}
				>
					Arène de Duel
				</TypographyComponent>
				<TypographyComponent
					variant="bodySmall"
					color={colors.text.secondary}
					style={{ textAlign: "center" }}
				>
					Affronte d'autres élèves et grimpe le classement !
				</TypographyComponent>
			</View>

			{/* Boutons d'action */}
			<View style={styles.actionsContainer}>
				<TouchableOpacity
					style={[styles.actionCard, styles.shadow]}
					onPress={onRandomMatch}
					activeOpacity={0.9}
				>
					<View style={[styles.actionGradient, styles.inactiveCard]}>
						<View style={[styles.iconCircle, { backgroundColor: "#FFF3E0" }]}>
							<Ionicons name="flash-outline" size={28} color={colors.secondary} />
						</View>
						<View style={styles.actionTextContainer}>
							<TypographyComponent variant="h5" color={colors.text.primary}>
								Combat Aléatoire
							</TypographyComponent>
							<TypographyComponent
								variant="labelSmall"
								color={colors.text.secondary}
							>
								Gagne des points bonus
							</TypographyComponent>
						</View>
					</View>
				</TouchableOpacity>

				{/* Bouton Défier un ami */}
				<TouchableOpacity
					style={[styles.actionCard, styles.secondaryCard, styles.shadow]}
					onPress={onChallengeModal}
					activeOpacity={0.9}
				>
					<View style={styles.actionContentRow}>
						<View style={[styles.iconCircle, { backgroundColor: "#FFF3E0" }]}>
							<Ionicons name="people-circle-outline" size={28} color={colors.secondary} />
						</View>
						<View style={styles.actionTextContainer}>
							<TypographyComponent variant="h6" color={colors.text.primary}>
								Défier un ami
							</TypographyComponent>
							<TypographyComponent
								variant="labelSmall"
								color={colors.text.secondary}
							>
								Choisis ton adversaire
							</TypographyComponent>
						</View>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		marginVertical: 20,
		alignItems: "center",
	},
	actionsContainer: {
		marginBottom: 24,
		gap: 16,
	},
	actionCard: {
		borderRadius: 20,
		overflow: "hidden",
	},
	actionGradient: {
		flexDirection: "row",
		alignItems: "center",
		padding: 20,
		height: 80,
	},
	inactiveCard: {
		backgroundColor: colors.white,
		borderWidth: 1,
		borderColor: colors.border.light,
	},
	secondaryCard: {
		backgroundColor: colors.white,
		height: 80,
		justifyContent: "center",
		borderWidth: 1,
		borderColor: colors.border.light,
	},
	actionContentRow: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 20,
	},
	iconCircle: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: colors.white,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 16,
	},
	actionTextContainer: {
		flex: 1,
	},
	shadow: {
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
	},
});

export default DuelScreenHeader;
