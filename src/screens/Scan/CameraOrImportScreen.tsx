import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Modal,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import styles from '../../constants/Colors';

const { width } = Dimensions.get('window');

type CameraOrImportScreenRouteProp = RouteProp<
  RootStackParamList,
  'CameraOrImport'
>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface CameraOrImportScreenProps {
  route: CameraOrImportScreenRouteProp;
  navigation: NavigationProp;
}

interface DocumentPreview {
  uri: string;
  name: string;
  type: string;
  mimeType?: string;
  size?: number;
  isImage: boolean;
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F1',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#FFF8F1',
    position: 'relative',
  },
  backButton: {
    padding: 8,
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  logo: {
    width: 30,
    height: 30,
    alignSelf: 'center',
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  typeChip: {
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  typeChipText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  instructionText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  actionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButton: {
    backgroundColor: '#FF8C00',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonSecondary: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#FF8C00',
    marginBottom: 0,
  },
  actionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginLeft: 8,
  },
  actionButtonTextSecondary: {
    color: '#FF8C00',
  },
  tipCard: {
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e40af',
    marginLeft: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 20,
  },
  previewCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  previewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  previewImageContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    minHeight: 240,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewImage: {
    width: '100%',
    height: 240,
    borderRadius: 12,
  },
  previewPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  previewPlaceholderText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 12,
  },
  documentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  documentInfo: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
  },
  documentInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  documentInfoLabel: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  documentInfoValue: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  actionButtonsContainer: {
    gap: 12,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  sendButton: {
    backgroundColor: '#FF8C00',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    margin: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    minWidth: 100,
    alignItems: 'center',
  },
  modalButtonCancel: {
    backgroundColor: '#f3f4f6',
  },
  modalButtonDelete: {
    backgroundColor: '#ef4444',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalButtonTextCancel: {
    color: '#666',
  },
  modalButtonTextDelete: {
    color: 'white',
  },
  modalButtonSend: {
    backgroundColor: '#FF8C00',
  },
  modalButtonTextSend: {
    color: 'white',
  },
});

function CameraOrImportScreen({
  route,
  navigation,
}: CameraOrImportScreenProps) {
  const { documentType } = route.params;
  const [selectedDocument, setSelectedDocument] =
    useState<DocumentPreview | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);

  const getDocumentTypeInfo = (type: string) => {
    switch (type) {
      case 'cours':
        return { name: 'Cours', emoji: '📚', color: '#FF8C00' };
      case 'exercice':
        return { name: 'Exercice', emoji: '✏️', color: '#4CAF50' };
      case 'bulletin':
        return { name: 'Bulletin', emoji: '📊', color: '#2196F3' };
      case 'emploi':
        return { name: 'Planning', emoji: '📅', color: '#9C27B0' };
      default:
        return { name: type, emoji: '📄', color: '#FF8C00' };
    }
  };

  const documentInfo = getDocumentTypeInfo(documentType);

  const handleCameraCapture = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (permissionResult.granted === false) {
        Alert.alert(
          'Permission requise',
          "Vous devez autoriser l'accès à la caméra pour prendre des photos."
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
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
          mimeType: 'image/jpeg',
          size: image.fileSize,
          isImage: true,
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'ouverture de la caméra:", error);
      Alert.alert('Erreur', "Impossible d'ouvrir la caméra");
    }
  };

  const handleFileImport = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
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
          isImage: document.mimeType?.startsWith('image/') || false,
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'import:", error);
      Alert.alert('Erreur', "Impossible d'importer le document");
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

  const handleSendDocument = async () => {
    if (!selectedDocument) {
      Alert.alert('Erreur', 'Aucun document sélectionné');
      return;
    }
    setShowSendModal(true);
  };

  const handleConfirmSend = async () => {
    if (!selectedDocument) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: selectedDocument.uri,
        type: selectedDocument.mimeType || 'application/octet-stream',
        name: selectedDocument.name,
      } as any);
      formData.append('documentType', documentType);
      formData.append('fileName', selectedDocument.name);

      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      setShowSendModal(false);
      Alert.alert('Succès ! 🎉', 'Votre document a été envoyé avec succès.', [
        { text: 'OK', onPress: () => navigation.navigate('Home') },
      ]);
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      Alert.alert('Erreur', "Impossible d'envoyer le document");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancelSend = () => {
    setShowSendModal(false);
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Taille inconnue';
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
  };

  return (
    <SafeAreaView style={localStyles.container}>
      <View style={localStyles.header}>
        <TouchableOpacity
          style={localStyles.backButton}
          onPress={() => navigation.goBack()}
          disabled={isUploading}
        >
          <Ionicons name='arrow-back' size={24} color='#333' />
        </TouchableOpacity>
        <Image
          source={require('../../../assets/images/logo_sans_fond.png')}
          style={styles.smallLogo}
        />
      </View>

      <ScrollView
        style={localStyles.content}
        showsVerticalScrollIndicator={false}
      >
        {!selectedDocument ? (
          // Selection Phase
          <View>
            <View style={localStyles.typeChip}>
              <Text style={localStyles.typeChipText}>
                {documentInfo.emoji} {documentInfo.name}
              </Text>
            </View>

            <Text style={localStyles.instructionText}>
              Choisissez comment vous souhaitez ajouter votre document. Vous
              pourrez le vérifier avant de l'envoyer.
            </Text>

            <View style={localStyles.actionCard}>
              <TouchableOpacity
                style={localStyles.actionButton}
                onPress={handleCameraCapture}
                disabled={isUploading}
              >
                <View style={localStyles.actionButtonContent}>
                  <Ionicons name='camera' size={24} color='white' />
                  <Text style={localStyles.actionButtonText}>
                    Prendre une photo
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  localStyles.actionButton,
                  localStyles.actionButtonSecondary,
                ]}
                onPress={handleFileImport}
                disabled={isUploading}
              >
                <View style={localStyles.actionButtonContent}>
                  <Ionicons name='folder-open' size={24} color='#FF8C00' />
                  <Text
                    style={[
                      localStyles.actionButtonText,
                      localStyles.actionButtonTextSecondary,
                    ]}
                  >
                    Importer un fichier
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={localStyles.tipCard}>
              <View style={localStyles.tipHeader}>
                <Ionicons name='bulb' size={20} color='#1e40af' />
                <Text style={localStyles.tipTitle}>Conseil</Text>
              </View>
              <Text style={localStyles.tipText}>
                Pour une meilleure qualité, assurez-vous que le document est
                bien éclairé et lisible.
              </Text>
            </View>
          </View>
        ) : (
          // Preview Phase
          <View>
            <View style={localStyles.previewCard}>
              <Text style={localStyles.previewTitle}>Document Preview</Text>

              <View style={localStyles.previewImageContainer}>
                {selectedDocument.isImage ? (
                  <Image
                    source={{ uri: selectedDocument.uri }}
                    style={localStyles.previewImage}
                    resizeMode='contain'
                  />
                ) : (
                  <View style={localStyles.previewPlaceholder}>
                    <Ionicons name='document-text' size={64} color='#666' />
                    <Text style={localStyles.previewPlaceholderText}>
                      Document PDF
                    </Text>
                  </View>
                )}
              </View>

              <Text style={localStyles.documentName} numberOfLines={2}>
                {selectedDocument.name}
              </Text>

              <View style={localStyles.documentInfo}>
                <View style={localStyles.documentInfoRow}>
                  <Text style={localStyles.documentInfoLabel}>Type:</Text>
                  <Text style={localStyles.documentInfoValue}>
                    {selectedDocument.mimeType}
                  </Text>
                </View>
                <View style={localStyles.documentInfoRow}>
                  <Text style={localStyles.documentInfoLabel}>Taille:</Text>
                  <Text style={localStyles.documentInfoValue}>
                    {formatFileSize(selectedDocument.size)}
                  </Text>
                </View>
                <View style={localStyles.documentInfoRow}>
                  <Text style={localStyles.documentInfoLabel}>Catégorie:</Text>
                  <Text style={localStyles.documentInfoValue}>
                    {documentInfo.emoji} {documentInfo.name}
                  </Text>
                </View>
              </View>
            </View>

            <View style={localStyles.actionButtonsContainer}>
              <TouchableOpacity
                style={[localStyles.actionButton, localStyles.sendButton]}
                onPress={handleSendDocument}
                disabled={isUploading}
              >
                {isUploading ? (
                  <View style={localStyles.loadingContainer}>
                    <ActivityIndicator size='small' color='white' />
                    <Text style={localStyles.loadingText}>
                      Envoi en cours...
                    </Text>
                  </View>
                ) : (
                  <View style={localStyles.actionButtonContent}>
                    <Ionicons name='cloud-upload' size={24} color='white' />
                    <Text style={localStyles.actionButtonText}>
                      Envoyer le document
                    </Text>
                  </View>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[localStyles.actionButton, localStyles.deleteButton]}
                onPress={handleDeleteDocument}
                disabled={isUploading}
              >
                <View style={localStyles.actionButtonContent}>
                  <Ionicons name='trash' size={24} color='white' />
                  <Text style={localStyles.actionButtonText}>Supprimer</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      <Modal
        visible={showDeleteModal}
        transparent={true}
        animationType='fade'
        onRequestClose={handleCancelDelete}
      >
        <View style={localStyles.modalOverlay}>
          <View style={localStyles.modalContainer}>
            <Text style={localStyles.modalTitle}>Supprimer le document</Text>
            <Text style={localStyles.modalText}>
              Êtes-vous sûr de vouloir supprimer ce document ?
            </Text>
            <View style={localStyles.modalButtonsContainer}>
              <TouchableOpacity
                style={[localStyles.modalButton, localStyles.modalButtonCancel]}
                onPress={handleCancelDelete}
              >
                <Text
                  style={[
                    localStyles.modalButtonText,
                    localStyles.modalButtonTextCancel,
                  ]}
                >
                  Annuler
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[localStyles.modalButton, localStyles.modalButtonDelete]}
                onPress={handleConfirmDelete}
              >
                <Text
                  style={[
                    localStyles.modalButtonText,
                    localStyles.modalButtonTextDelete,
                  ]}
                >
                  Supprimer
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showSendModal}
        transparent={true}
        animationType='fade'
        onRequestClose={handleCancelSend}
      >
        <View style={localStyles.modalOverlay}>
          <View style={localStyles.modalContainer}>
            <Text style={localStyles.modalTitle}>Envoyer le document</Text>
            <Text style={localStyles.modalText}>
              Êtes-vous sûr de vouloir envoyer ce document ?
            </Text>
            <View style={localStyles.modalButtonsContainer}>
              <TouchableOpacity
                style={[localStyles.modalButton, localStyles.modalButtonCancel]}
                onPress={handleCancelSend}
                disabled={isUploading}
              >
                <Text
                  style={[
                    localStyles.modalButtonText,
                    localStyles.modalButtonTextCancel,
                  ]}
                >
                  Annuler
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[localStyles.modalButton, localStyles.modalButtonSend]}
                onPress={handleConfirmSend}
                disabled={isUploading}
              >
                {isUploading ? (
                  <ActivityIndicator color='white' size='small' />
                ) : (
                  <Text
                    style={[
                      localStyles.modalButtonText,
                      localStyles.modalButtonTextSend,
                    ]}
                  >
                    Envoyer
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default CameraOrImportScreen;
