import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Typography from '@components/Typography.component';
import { colors } from '@theme/colors';
import { useTranslation } from 'react-i18next';


type Props = {
    documentInfo: {
        name: string;
        emoji: string;
    };
    selectedDocument: {
        uri: string;
        name: string;
        size?: number;
        mimeType?: string;
        isImage: boolean;
    };
    onFormatFileSize: (size: number) => string;
};


const ScanOrImportPreview = ({documentInfo, selectedDocument, onFormatFileSize}: Props) => {
	const { t } = useTranslation();
	return (
		<View>
			<View style={styles.previewCard}>
				<Typography
					variant="h4"
					color={colors.text.primary}
					style={styles.previewTitle}
				>
                    {t('scanImport.preview.title')}
				</Typography>

				<View style={styles.previewImageContainer}>
					{selectedDocument.isImage ? (
						<Image
							source={{ uri: selectedDocument.uri }}
							style={styles.previewImage}
							resizeMode="contain"
						/>
					) : (
						<View style={styles.previewPlaceholder}>
							<Ionicons
								name="document-text"
								size={64}
								color={colors.text.secondary}
							/>
							<Typography
								variant="body"
								color={colors.text.secondary}
								style={styles.previewPlaceholderText}
							>
                                {t('scanImport.preview.pdf')}
							</Typography>
						</View>
					)}
				</View>

				<Typography
					variant="h6"
					color={colors.text.primary}
					style={styles.documentName}
					numberOfLines={2}
				>
					{selectedDocument.name}
				</Typography>

				<View style={styles.documentInfo}>
					<View style={styles.documentInfoRow}>
						<Typography
							variant="label"
							color={colors.text.secondary}
							style={styles.documentInfoLabel}
						>
							{t('scanImport.preview.type')}:
						</Typography>
						<Typography
							variant="label"
							color={colors.text.primary}
							style={styles.documentInfoValue}
						>
							{selectedDocument.mimeType}
						</Typography>
					</View>
					<View style={styles.documentInfoRow}>
						<Typography
							variant="label"
							color={colors.text.secondary}
							style={styles.documentInfoLabel}
						>
							{t('scanImport.preview.size')}:
						</Typography>
						<Typography
							variant="label"
							color={colors.text.primary}
							style={styles.documentInfoValue}
						>
							{onFormatFileSize(selectedDocument.size ?? 0)}
						</Typography>
					</View>
					<View style={styles.documentInfoRow}>
						<Typography
							variant="label"
							color={colors.text.secondary}
							style={styles.documentInfoLabel}
						>
                            {t('scanImport.preview.category')}:
						</Typography>
						<Typography
							variant="label"
							color={colors.text.primary}
							style={styles.documentInfoValue}
						>
							{documentInfo.emoji} {documentInfo.name}
						</Typography>
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
    previewCard: {
        backgroundColor: colors.card,
        borderRadius: 8,
        padding: 16,
        marginBottom: 32,
    },
    previewTitle: {
        marginBottom: 16,
        textAlign: 'center',
    },
    previewImageContainer: {
        width: '100%',
        height: 200,
        backgroundColor: colors.background,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    previewImage: {
        width: '100%',
        height: '100%',
    },
    previewPlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    previewPlaceholderText: {
        marginTop: 8,
    },
    documentName: {
        marginBottom: 8,
    },
    documentInfo: {
        gap: 8,
    },
    documentInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    documentInfoLabel: {
        fontWeight: 'bold',
    },
    documentInfoValue: {
        maxWidth: '70%',
        textAlign: 'right',
    },
});

export default ScanOrImportPreview;
