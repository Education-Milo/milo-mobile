import React from "react";
import {
	View,
	ScrollView,
	StyleSheet,
	SafeAreaView,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AuthStackParamList } from "@navigation/Auth/authNavigator.model";
import { colors } from "@theme/colors";
import { useScanOrImportDocument } from "@hooks/useScanOrImportDocument";
import ScanOrImportHeader from "@components/ScanImport/ScanOrImportHeader.component";
import ScanOrImportFooter from "@components/ScanImport/ScanOrImportFooter.component";
import ScanOrImportSelection from "@components/ScanImport/ScanOrImportSelection.component";
import ScanOrImportPreview from "@components/ScanImport/ScanOrImportPreview.component";

type CameraOrImportRouteProp = RouteProp<AuthStackParamList, "CameraOrImport">;

const CameraOrImportScreen = () => {
	const route = useRoute<CameraOrImportRouteProp>();
	const { documentType } = route.params;
	const {
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
	} = useScanOrImportDocument({ documentType });

	return (
		<SafeAreaView style={localStyles.container}>
			<ScanOrImportHeader disabled={isUploading} onBack={handleGoBack} />

			<ScrollView
				style={localStyles.content}
				showsVerticalScrollIndicator={false}
			>
				{!selectedDocument ? (
					<ScanOrImportSelection
						documentInfo={documentInfo}
						isUploading={isUploading}
						onCameraCapture={handleCameraCapture}
						onFileImport={handleFileImport}
					/>
				) : (
					<ScanOrImportPreview
						documentInfo={documentInfo}
						selectedDocument={selectedDocument}
						onFormatFileSize={formatFileSize}
					/>
				)}

				{selectedDocument && (
					<View style={{ marginBottom: 32 }}>
						<ScanOrImportFooter
							isUploading={isUploading}
							onSend={handleSendDocument}
							onDelete={handleDeleteDocument}
							showDeleteModal={showDeleteModal}
							onCancelDelete={handleCancelDelete}
							onConfirmDelete={handleConfirmDelete}
							showSendModal={showSendModal}
							onCancelSend={handleCancelSend}
							onConfirmSend={handleConfirmSend}
						/>
					</View>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

const localStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	content: {
		flex: 1,
		padding: 16,
	},
});

export default CameraOrImportScreen;
