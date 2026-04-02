import React from "react";
import {
	View,
	TouchableOpacity,
	Modal,
	StyleSheet,
	ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Typography from "@components/Typography.component";
import { colors } from "@theme/colors";
import { useTranslation } from "react-i18next";

type Props = {
	isUploading: boolean;
	onSend: () => void;
	onDelete: () => void;
	showDeleteModal: boolean;
	onCancelDelete: () => void;
	onConfirmDelete: () => void;
	showSendModal: boolean;
	onCancelSend: () => void;
	onConfirmSend: () => void;
};

const ScanOrImportFooter = (props: Props) => {
	const { t } = useTranslation();
	const {
		isUploading,
		onSend,
		onDelete,
		showDeleteModal,
		onCancelDelete,
		onConfirmDelete,
		showSendModal,
		onCancelSend,
		onConfirmSend,
	} = props;

	return (
		<>
			<View style={styles.actionButtonsContainer}>
				<TouchableOpacity
					style={[styles.actionButton, styles.sendButton]}
					onPress={onSend}
					disabled={isUploading}
				>
					{isUploading ? (
						<View style={styles.loadingContainer}>
							<ActivityIndicator size="small" color={colors.text.white} />
							<Typography variant="button" style={styles.loadingText}>
								{t("scanImport.footer.uploading")}
							</Typography>
						</View>
					) : (
						<View style={styles.actionButtonContent}>
							<Ionicons
								name="cloud-upload"
								size={24}
								color={colors.text.white}
							/>
							<Typography variant="button" style={styles.actionButtonText}>
								{t("scanImport.footer.sendDocument")}
							</Typography>
						</View>
					)}
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.actionButton, styles.deleteButton]}
					onPress={onDelete}
					disabled={isUploading}
				>
					<View style={styles.actionButtonContent}>
						<Ionicons name="trash" size={24} color={colors.text.white} />
						<Typography variant="button" style={styles.actionButtonText}>
							{t("scanImport.footer.delete")}
						</Typography>
					</View>
				</TouchableOpacity>
			</View>

			<Modal
				visible={showDeleteModal}
				transparent
				animationType="fade"
				onRequestClose={onCancelDelete}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContainer}>
						<Typography
							variant="h5"
							color={colors.text.primary}
							style={styles.modalTitle}
						>
							{t("scanImport.footer.deleteTitle")}
						</Typography>
						<Typography
							variant="body"
							color={colors.text.secondary}
							style={styles.modalText}
						>
							{t("scanImport.footer.deleteConfirm")}
						</Typography>
						<View style={styles.modalButtonsContainer}>
							<TouchableOpacity
								style={[styles.modalButton, styles.modalButtonCancel]}
								onPress={onCancelDelete}
							>
								<Typography
									variant="button"
									color={colors.text.secondary}
									style={styles.modalButtonText}
								>
									{t("scanImport.footer.cancel")}
								</Typography>
							</TouchableOpacity>
							<TouchableOpacity
								style={[styles.modalButton, styles.modalButtonDelete]}
								onPress={onConfirmDelete}
							>
								<Typography
									variant="button"
									color={colors.text.white}
									style={styles.modalButtonText}
								>
									{t("scanImport.footer.delete")}
								</Typography>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>

			<Modal
				visible={showSendModal}
				transparent
				animationType="fade"
				onRequestClose={onCancelSend}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContainer}>
						<Typography
							variant="h5"
							color={colors.text.primary}
							style={styles.modalTitle}
						>
							{t("scanImport.footer.sendTitle")}
						</Typography>
						<Typography
							variant="body"
							color={colors.text.secondary}
							style={styles.modalText}
						>
							{t("scanImport.footer.sendConfirm")}
						</Typography>
						<View style={styles.modalButtonsContainer}>
							<TouchableOpacity
								style={[styles.modalButton, styles.modalButtonCancel]}
								onPress={onCancelSend}
								disabled={isUploading}
							>
								<Typography
									variant="button"
									color={colors.text.secondary}
									style={styles.modalButtonText}
								>
									{t("scanImport.footer.cancel")}
								</Typography>
							</TouchableOpacity>
							<TouchableOpacity
								style={[styles.modalButton, styles.modalButtonSend]}
								onPress={onConfirmSend}
								disabled={isUploading}
							>
								{isUploading ? (
									<ActivityIndicator color={colors.text.white} size="small" />
								) : (
									<Typography
										variant="button"
										color={colors.text.white}
										style={styles.modalButtonText}
									>
										{t("scanImport.footer.send")}
									</Typography>
								)}
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		</>
	);
};

const styles = StyleSheet.create({
	actionButtonsContainer: {
		gap: 12,
		marginBottom: 32,
		paddingHorizontal: 16,
	},
	actionButton: {
		backgroundColor: colors.primary,
		borderRadius: 25,
		padding: 15,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 12,
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	sendButton: {
		backgroundColor: colors.primary,
	},
	deleteButton: {
		backgroundColor: colors.error,
		marginBottom: 0,
	},
	actionButtonContent: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	actionButtonText: {
		marginLeft: 8,
	},
	loadingContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	loadingText: {
		marginLeft: 12,
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: colors.overlay,
		justifyContent: "center",
		alignItems: "center",
	},
	modalContainer: {
		backgroundColor: colors.white,
		borderRadius: 25,
		padding: 20,
		alignItems: "center",
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		margin: 20,
		width: "80%",
	},
	modalTitle: {
		marginBottom: 10,
	},
	modalText: {
		textAlign: "center",
		marginBottom: 20,
	},
	modalButtonsContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "100%",
	},
	modalButton: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 20,
		minWidth: 100,
		alignItems: "center",
	},
	modalButtonCancel: {
		backgroundColor: colors.border.light,
	},
	modalButtonDelete: {
		backgroundColor: colors.error,
	},
	modalButtonSend: {
		backgroundColor: colors.primary,
	},
	modalButtonText: {},
});

export default ScanOrImportFooter;
