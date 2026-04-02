import React from "react";
import { View, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import TypographyComponent from "@components/Typography.component";
import { colors } from "@theme/colors";
import { Ionicons } from "@expo/vector-icons";

interface QCMResultsScreenProps {
	score: number;
	totalQuestions: number;
	totalTime: number;
	xpEarned: number;
	onRestart: () => void;
	onBackToHome: () => void;
}

const QCMResultsScreen: React.FC<QCMResultsScreenProps> = ({
	score,
	totalQuestions,
	totalTime,
	xpEarned,
	onRestart,
	onBackToHome,
}) => {
	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		if (mins === 0) return `${secs}s`;
		return `${mins}m${secs < 10 ? "0" : ""}${secs}s`;
	};

	return (
		<SafeAreaView style={styles.resultsContainer}>
			<View style={styles.resultsContent}>
				{/* Titre */}
				<View style={styles.headerSection}>
					<TypographyComponent variant="h3" style={styles.resultsTitle}>
						Excellent travail !
					</TypographyComponent>
					<TypographyComponent
						variant="body"
						color={colors.text.secondary}
						style={styles.resultsSubtitle}
					>
						Tu as gagné {xpEarned} XP dans cette leçon
					</TypographyComponent>
				</View>

				{/* Cartes côte à côte */}
				<View style={styles.cardsContainer}>
					{/* Carte XP */}
					<View style={[styles.card, styles.cardXP]}>
						<TypographyComponent variant="labelSmall" style={[styles.cardTitle, styles.cardTitleXP]}>
							TOTAL XP
						</TypographyComponent>
						<View style={styles.cardIconContainer}>
							<Ionicons name="flame" size={28} color="#F4922A" />
						</View>
						<TypographyComponent variant="h2" style={[styles.cardValue, styles.cardValueXP]}>
							{xpEarned}
						</TypographyComponent>
					</View>

					{/* Carte Temps */}
					<View style={[styles.card, styles.cardTime]}>
						<TypographyComponent variant="labelSmall" style={[styles.cardTitle, styles.cardTitleTime]}>
							TEMPS
						</TypographyComponent>
						<View style={styles.cardIconContainer}>
							<Ionicons name="time-outline" size={28} color="#3B9DFF" />
						</View>
						<TypographyComponent
							variant="h2"
							style={[styles.cardValue, styles.cardValueTime]}
							numberOfLines={1}
							adjustsFontSizeToFit
						>
							{formatTime(totalTime)}
						</TypographyComponent>
					</View>

					{/* Carte Score */}
					<View style={[styles.card, styles.cardScore]}>
						<TypographyComponent variant="labelSmall" style={[styles.cardTitle, styles.cardTitleScore]}>
							SCORE
						</TypographyComponent>
						<View style={styles.cardIconContainer}>
							<Ionicons name="pulse-outline" size={28} color="#4CAF50" />
						</View>
						<TypographyComponent variant="h2" style={[styles.cardValue, styles.cardValueScore]}>
							{score}%
						</TypographyComponent>
					</View>
				</View>

				{/* Boutons */}
				<View style={styles.resultsButtons}>
					<TouchableOpacity
						style={[styles.resultButton, styles.restartButton]}
						onPress={onRestart}
					>
						<TypographyComponent variant="button">
							Recommencer le quiz
						</TypographyComponent>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.resultButton, styles.homeButton]}
						onPress={onBackToHome}
					>
						<TypographyComponent variant="button" color="orange">
							Retour à l'accueil
						</TypographyComponent>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	resultsContainer: {
		flex: 1,
		backgroundColor: "#FFF8F1",
	},
	resultsContent: {
		flex: 1,
		paddingHorizontal: 20,
		paddingTop: 60,
		paddingBottom: 40,
		justifyContent: "space-between",
	},
	headerSection: {
		alignItems: "center",
		marginBottom: 20,
	},
	resultsTitle: {
		textAlign: "center",
		marginBottom: 8,
	},
	resultsSubtitle: {
		textAlign: "center",
	},
	cardsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 40,
		gap: 10,
	},
	card: {
		flex: 1,
		borderRadius: 20,
		paddingVertical: 16,
		paddingHorizontal: 8,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
		minHeight: 150,
		justifyContent: "space-between",
		borderWidth: 3,
	},
	cardXP: {
		backgroundColor: "#FFF9F0",
		borderColor: "#F4922A",
	},
	cardTime: {
		backgroundColor: "#F0F8FF",
		borderColor: "#3B9DFF",
	},
	cardScore: {
		backgroundColor: "#F1F8F4",
		borderColor: "#4CAF50",
	},
	cardTitle: {
		fontWeight: "700",
		textAlign: "center",
		letterSpacing: 0.5,
		fontSize: 10,
	},
	cardTitleXP: { color: "#F4922A" },
	cardTitleTime: { color: "#3B9DFF" },
	cardTitleScore: { color: "#4CAF50" },
	cardIconContainer: {
		marginVertical: 4,
	},
	cardValue: {
		textAlign: "center",
		width: "100%",
	},
	cardValueXP: {
		color: "#F4922A",
	},
	cardValueTime: {
		color: "#3B9DFF",
	},
	cardValueScore: {
		color: "#4CAF50",
	},
	resultsButtons: {
		gap: 12,
	},
	resultButton: {
		borderRadius: 12,
		paddingVertical: 16,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	restartButton: {
		backgroundColor: "#F4922A",
	},
	homeButton: {
		backgroundColor: colors.background,
		borderWidth: 2,
		borderColor: "#F4922A",
		paddingVertical: 14,
	},
});

export default QCMResultsScreen;