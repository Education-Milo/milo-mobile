import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Swords, Zap } from "lucide-react-native";
import TypographyComponent from "@components/Typography.component";
import { colors } from "@theme/colors";

interface GameScreenHeaderProps {
	onRandomMatch: () => void;
	onChallengeModal: () => void;
}

const GameScreenHeader = ({
	onRandomMatch,
	onChallengeModal,
}: GameScreenHeaderProps) => {
	const [isRandomActive, setIsRandomActive] = useState(false);

	const handleRandomMatch = () => {
		setIsRandomActive(true);
		onRandomMatch();
	};

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
					onPress={handleRandomMatch}
					activeOpacity={0.9}
				>
					{isRandomActive ? (
						<LinearGradient
							colors={[colors.primary, "#FF6B00"]}
							style={styles.actionGradient}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
						>
							<View style={styles.iconCircle}>
								<Zap size={32} color={colors.primary} fill={colors.primary} />
							</View>
							<View style={styles.actionTextContainer}>
								<TypographyComponent variant="h5" color={colors.white}>
									Combat Aléatoire
								</TypographyComponent>
								<TypographyComponent
									variant="labelSmall"
									color={colors.white_70}
								>
									Gagne des points bonus
								</TypographyComponent>
							</View>
						</LinearGradient>
					) : (
						<View style={[styles.actionGradient, styles.inactiveCard]}>
							<View style={[styles.iconCircle, { backgroundColor: "#FFF3E0" }]}>
								<Zap size={32} color={colors.secondary} />
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
					)}
				</TouchableOpacity>

				{/* Bouton Défier un ami */}
				<TouchableOpacity
					style={[styles.actionCard, styles.secondaryCard, styles.shadow]}
					onPress={onChallengeModal}
					activeOpacity={0.9}
				>
					<View style={styles.actionContentRow}>
						<View style={[styles.iconCircle, { backgroundColor: "#FFF3E0" }]}>
							<Swords size={28} color={colors.secondary} />
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
		height: 100,
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

export default GameScreenHeader;
