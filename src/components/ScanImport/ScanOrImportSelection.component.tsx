import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Typography from "@components/Typography.component";
import { colors } from "@theme/colors";
import { useTranslation } from "react-i18next";

type Props = {
	documentInfo: {
		name: string;
		emoji: string;
	};
	isUploading: boolean;
	onCameraCapture: () => void;
	onFileImport: () => void;
};

const ScanOrImportSelection = ({
	documentInfo,
	isUploading,
	onCameraCapture,
	onFileImport,
}: Props) => {
	const { t } = useTranslation();
	return (
		<View>
			<View style={styles.typeChip}>
				<Typography variant="h6" color={colors.text.primary}>
					{documentInfo.emoji} {documentInfo.name}
				</Typography>
			</View>

			<Typography
				variant="body"
				color={colors.text.secondary}
				style={styles.instructionText}
			>
				{t("scanImport.selection.instruction")}
			</Typography>

			<View style={styles.actionCard}>
				<TouchableOpacity
					style={styles.actionButton}
					onPress={onCameraCapture}
					disabled={isUploading}
				>
					<View style={styles.actionButtonContent}>
						<Ionicons name="camera" size={24} color={colors.text.white} />
						<Typography variant="button" style={styles.actionButtonText}>
							{t("scanImport.selection.takePhoto")}
						</Typography>
					</View>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.actionButton, styles.actionButtonSecondary]}
					onPress={onFileImport}
					disabled={isUploading}
				>
					<View style={styles.actionButtonContent}>
						<Ionicons name="folder-open" size={24} color={colors.primary} />
						<Typography
							variant="button"
							color={colors.primary}
							style={styles.actionButtonText}
						>
							{t("scanImport.selection.importFile")}
						</Typography>
					</View>
				</TouchableOpacity>
			</View>

			<View style={styles.tipCard}>
				<View style={styles.tipHeader}>
					<Ionicons name="bulb" size={20} color={colors.primary} />
					<Typography
						variant="labelLarge"
						color={colors.text.primary}
						style={styles.tipTitle}
					>
						{t("scanImport.selection.tipTitle")}
					</Typography>
				</View>
				<Typography
					variant="bodySmall"
					color={colors.text.secondary}
					style={styles.tipText}
				>
					{t("scanImport.selection.tipDescription")}
				</Typography>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	typeChip: {
		backgroundColor: colors.primary,
		borderRadius: 20,
		paddingHorizontal: 12,
		paddingVertical: 6,
		alignSelf: "flex-start",
		marginBottom: 16,
	},
	instructionText: {
		textAlign: "center",
		marginBottom: 32,
	},
	actionCard: {
		backgroundColor: colors.white,
		borderRadius: 24,
		padding: 20,
		marginBottom: 32,
	},
	actionButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		borderRadius: 20,
		backgroundColor: colors.primary,
		marginBottom: 16,
	},
	actionButtonSecondary: {
		backgroundColor: colors.white,
		borderWidth: 1,
		borderColor: colors.primary,
	},
	actionButtonContent: {
		flexDirection: "row",
		alignItems: "center",
	},
	actionButtonText: {
		marginLeft: 8,
	},
	tipCard: {
		backgroundColor: colors.primaryLight,
		borderRadius: 20,
		padding: 16,
	},
	tipHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 8,
	},
	tipTitle: {
		marginLeft: 8,
	},
	tipText: {
		lineHeight: 20,
	},
});

export default ScanOrImportSelection;
