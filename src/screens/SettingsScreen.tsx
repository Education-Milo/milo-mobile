import React from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TypographyComponent from "@components/Typography.component";
import MainButtonComponent from "@components/MainButton.component";
import { colors } from "@theme/colors";
import { useSettingsScreen } from "@hooks/useSettingsScreen";

interface SettingItem {
	label: string;
	icon: React.ReactNode;
	onPress: () => void;
	danger?: boolean;
}

interface SettingSection {
	title: string;
	items: SettingItem[];
}

const SettingsScreen = () => {
	const { handleDone, handleLogout, handleTermsPress } = useSettingsScreen();

	const sections: SettingSection[] = [
		{
			title: "Légal",
			items: [
				{
					label: "Conditions d'utilisation",
					icon: <Ionicons name="document-text" size={20} color={colors.text.secondary} />,
					onPress: handleTermsPress,
				},
			],
		},
	];

	return (
		<SafeAreaView style={styles.safeArea}>
			{/* Header */}
			<View style={styles.header}>
				<TypographyComponent variant="h5" style={styles.headerTitle}>
					Paramètres
				</TypographyComponent>
				<TouchableOpacity onPress={handleDone} activeOpacity={0.7}>
					<TypographyComponent variant="button" color={colors.primary}>
						Terminé
					</TypographyComponent>
				</TouchableOpacity>
			</View>

			<ScrollView
				style={styles.scroll}
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				{/* Sections */}
				{sections.map((section) => (
					<View key={section.title} style={styles.section}>
						<TypographyComponent
							variant="labelSmall"
							color={colors.text.tertiary}
							style={styles.sectionTitle}
						>
							{section.title.toUpperCase()}
						</TypographyComponent>
						<View style={styles.sectionCard}>
							{section.items.map((item, index) => (
								<React.Fragment key={item.label}>
									<TouchableOpacity
										style={styles.item}
										onPress={item.onPress}
										activeOpacity={0.7}
									>
										<View
											style={[
												styles.itemIcon,
												{
													backgroundColor: item.danger ? "#FFF0F0" : "#F5F5F5",
												},
											]}
										>
											{item.icon}
										</View>
										<TypographyComponent
											variant="body"
											color={item.danger ? colors.error : colors.text.primary}
											style={styles.itemLabel}
										>
											{item.label}
										</TypographyComponent>
										<Ionicons name="chevron-forward" size={18} color={colors.text.tertiary} />
									</TouchableOpacity>
									{index < section.items.length - 1 && (
										<View style={styles.divider} />
									)}
								</React.Fragment>
							))}
						</View>
					</View>
				))}

				{/* Bouton déconnexion */}
				<View style={styles.logoutContainer}>
					<MainButtonComponent
						title="Se déconnecter"
						onPress={handleLogout}
						icon="log-out-outline"
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: colors.background,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#E5E5E5",
	},
	headerTitle: {
		flex: 1,
		textAlign: "center",
	},
	scroll: {
		flex: 1,
	},
	scrollContent: {
		paddingHorizontal: 20,
		paddingTop: 24,
		paddingBottom: 40,
		gap: 24,
	},
	section: {
		gap: 8,
	},
	sectionTitle: {
		marginLeft: 4,
		marginBottom: 4,
		letterSpacing: 0.8,
	},
	sectionCard: {
		backgroundColor: colors.white,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: "#E5E5E5",
		overflow: "hidden",
	},
	item: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 14,
	},
	itemIcon: {
		width: 36,
		height: 36,
		borderRadius: 18,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 12,
	},
	itemLabel: {
		flex: 1,
	},
	divider: {
		height: 1,
		backgroundColor: "#E5E5E5",
		marginHorizontal: 16,
	},
	logoutContainer: {
		marginTop: 8,
	},
});

export default SettingsScreen;
