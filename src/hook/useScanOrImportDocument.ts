import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { AuthStackParamList } from "@navigation/Auth/authNavigator.model";

type CameraOrImportNavigationProp =
	NativeStackNavigationProp<AuthStackParamList>;

export interface DocumentPreview {
	uri: string;
	name: string;
	type: string;
	mimeType?: string;
	size?: number;
	isImage: boolean;
}

interface UseScanOrImportDocumentParams {
	documentType: string;
}

const getDocumentTypeInfo = (type: string) => {
	switch (type) {
		case "cours":
			return { name: "Cours", emoji: "📚", color: "#FF8C00" };
		case "exercice":
			return { name: "Exercice", emoji: "✏️", color: "#4CAF50" };
		case "bulletin":
			return { name: "Bulletin", emoji: "📊", color: "#2196F3" };
		case "emploi":
			return { name: "Planning", emoji: "📅", color: "#9C27B0" };
		default:
			return { name: type, emoji: "📄", color: "#FF8C00" };
	}
};

export const useScanOrImportDocument = ({
	documentType,
}: UseScanOrImportDocumentParams) => {
	const navigation = useNavigation<CameraOrImportNavigationProp>();

	const [selectedDocument, setSelectedDocument] =
		useState<DocumentPreview | null>(null);
	const [isUploading, setIsUploading] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showSendModal, setShowSendModal] = useState(false);

	const documentInfo = getDocumentTypeInfo(documentType);

	const handleGoBack = () => {
		navigation.goBack();
	};

	const handleCameraCapture = async () => {
		try {
			const permissionResult =
				await ImagePicker.requestCameraPermissionsAsync();
			if (permissionResult.granted === false) {
				Alert.alert(
					"Permission requise",
					"Vous devez autoriser l'accès à la caméra pour prendre des photos."
				);
				return;
			}

			const result = await ImagePicker.launchCameraAsync({
				mediaTypes: ["images"],
				allowsEditing: false,
				aspect: [4, 3],
				quality: 0.8,
			});

			if (!result.canceled && result.assets && result.assets.length > 0) {
				const image = result.assets[0];
				const timestamp = Date.now();
				const fileName = `${documentType}_camera_${timestamp}.jpg`;

				setSelectedDocument({
					uri: image.uri,
					name: fileName,
					type: documentType,
					mimeType: "image/jpeg",
					size: image.fileSize,
					isImage: true,
				});
			}
		} catch (error) {
			console.error("Erreur lors de l'ouverture de la caméra:", error);
			Alert.alert("Erreur", "Impossible d'ouvrir la caméra");
		}
	};

	const handleFileImport = async () => {
		try {
			const result = await DocumentPicker.getDocumentAsync({
				type: ["image/*", "application/pdf"],
				copyToCacheDirectory: true,
				multiple: false,
			});

			if (!result.canceled && result.assets && result.assets.length > 0) {
				const document = result.assets[0];

				setSelectedDocument({
					uri: document.uri,
					name: document.name,
					type: documentType,
					mimeType: document.mimeType,
					size: document.size,
					isImage: document.mimeType?.startsWith("image/") || false,
				});
			}
		} catch (error) {
			console.error("Erreur lors de l'import:", error);
			Alert.alert("Erreur", "Impossible d'importer le document");
		}
	};

	const handleDeleteDocument = () => {
		setShowDeleteModal(true);
	};

	const handleConfirmDelete = () => {
		setSelectedDocument(null);
		setShowDeleteModal(false);
	};

	const handleCancelDelete = () => {
		setShowDeleteModal(false);
	};

	const handleSendDocument = () => {
		if (!selectedDocument) {
			Alert.alert("Erreur", "Aucun document sélectionné");
			return;
		}
		setShowSendModal(true);
	};

	const handleConfirmSend = async () => {
		if (!selectedDocument) return;

		setIsUploading(true);
		try {
			const formData = new FormData();
			formData.append("file", {
				uri: selectedDocument.uri,
				type: selectedDocument.mimeType || "application/octet-stream",
				name: selectedDocument.name,
			} as any);
			formData.append("documentType", documentType);
			formData.append("fileName", selectedDocument.name);

			// Simulation de délai d'envoi
			await new Promise((resolve) => setTimeout(resolve, 1500));

			setShowSendModal(false);
			Alert.alert("Succès ! 🎉", "Votre document a été envoyé avec succès.", [
				{ text: "OK", onPress: () => navigation.navigate("HomeTabs") },
			]);
		} catch (error) {
			console.error("Erreur lors de l'envoi:", error);
			Alert.alert("Erreur", "Impossible d'envoyer le document");
		} finally {
			setIsUploading(false);
		}
	};

	const handleCancelSend = () => {
		setShowSendModal(false);
	};

	const formatFileSize = (bytes?: number) => {
		if (!bytes) return "Taille inconnue";
		if (bytes < 1024) return `${bytes} B`;
		const kb = bytes / 1024;
		if (kb < 1024) return `${kb.toFixed(1)} KB`;
		const mb = kb / 1024;
		return `${mb.toFixed(1)} MB`;
	};

	return {
		documentInfo,
		selectedDocument,
		isUploading,
		showDeleteModal,
		showSendModal,
		handleGoBack,
		handleCameraCapture,
		handleFileImport,
		handleDeleteDocument,
		handleConfirmDelete,
		handleCancelDelete,
		handleSendDocument,
		handleConfirmSend,
		handleCancelSend,
		formatFileSize,
	};
};
