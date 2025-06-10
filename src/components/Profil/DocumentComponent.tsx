import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Alert, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/types';
import MainButtonComponent from '@components/MainButtonComponent';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Interface pour les documents
interface Document {
  id: string;
  name: string;
  type: 'cours' | 'exercice' | 'bulletin' | 'emploi';
  mimeType: string;
  size: number;
  dateAdded: string;
  uri?: string;
}

interface DocumentComponentProps {
  onRefresh?: () => void;
}

const DocumentComponent: React.FC<DocumentComponentProps> = ({ onRefresh }) => {
  const navigation = useNavigation<NavigationProp>();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Charger les documents au montage du composant
  useEffect(() => {
    loadDocuments();
  }, []);

  // Fonction pour charger les documents depuis l'API
  const loadDocuments = async () => {
    setIsLoading(true);
    try {
      console.log('Chargement des documents...');
      // APIAxios.post(APIRoutes.GETDocument(), formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //     // 'Authorization': `Bearer ${token}`,
      //   },
      // })
    } catch (error) {
      console.error('Erreur lors du chargement des documents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour rafraîchir la liste
  const handleRefresh = async () => {
    await loadDocuments();
    onRefresh?.();
  };

  // Fonction pour supprimer un document
  const deleteDocument = async (documentId: string) => {
    Alert.alert(
      'Supprimer le document',
      'Êtes-vous sûr de vouloir supprimer ce document ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            try {
              // APIAxios.post(APIRoutes.DELETEDocument(documentId), formData, {
              //   headers: {
              //     'Content-Type': 'multipart/form-data',
              //     // 'Authorization': `Bearer ${token}`,
              //   },
              // })
              // Supprimer le document de la liste locale après succès de l'API
              setDocuments(prev => prev.filter(doc => doc.id !== documentId));
            } catch (error) {
              console.error('Erreur lors de la suppression:', error);
              Alert.alert('Erreur', 'Impossible de supprimer le document');
            }
          },
        },
      ]
    );
  };

  // Fonction pour obtenir l'icône selon le type de document
  const getDocumentIcon = (type: string, mimeType: string) => {
    if (mimeType.startsWith('image/')) {
      return '🖼️';
    } else if (mimeType === 'application/pdf') {
      return '📄';
    }
    switch (type) {
      case 'cours':
        return '📚';
      case 'exercice':
        return '📝';
      case 'bulletin':
        return '📊';
      case 'emploi':
        return '📅';
      default:
        return '📄';
    }
  };

  // Fonction pour obtenir le nom du type
  const getDocumentTypeName = (type: string) => {
    switch (type) {
      case 'cours':
        return 'Cours';
      case 'exercice':
        return 'Exercice';
      case 'bulletin':
        return 'Bulletin';
      case 'emploi':
        return 'Planning';
      default:
        return type;
    }
  };

  // Fonction pour formater la taille du fichier
  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    if (mb < 1) {
      const kb = bytes / 1024;
      return `${kb.toFixed(0)} KB`;
    }
    return `${mb.toFixed(1)} MB`;
  };

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Composant pour afficher un document
  const DocumentItem = ({ item }: { item: Document }) => (
    <View
      style={{
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            backgroundColor: '#FFF5E6',
            borderRadius: 25,
            padding: 8,
            marginRight: 12,
          }}
        >
          <Text style={{ fontSize: 20 }}>
            {getDocumentIcon(item.type, item.mimeType)}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: '#333',
              marginBottom: 4,
            }}
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 4,
            }}
          >
            <View
              style={{
                backgroundColor: '#FF8C00',
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 10,
                marginRight: 8,
              }}
            >
              <Text
                style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}
              >
                {getDocumentTypeName(item.type)}
              </Text>
            </View>
            <Text style={{ color: '#666', fontSize: 12 }}>
              {formatFileSize(item.size)}
            </Text>
          </View>
          <Text style={{ color: '#999', fontSize: 12 }}>
            Ajouté le {formatDate(item.dateAdded)}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            padding: 8,
            borderRadius: 20,
            backgroundColor: '#FFE6E6',
          }}
          onPress={() => deleteDocument(item.id)}
        >
          <Ionicons name='trash-outline' size={18} color='#FF4444' />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>
          Mes Documents ({documents.length})
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#FF8C00',
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 15,
          }}
          onPress={handleRefresh}
          disabled={isLoading}
        >
          <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
            {isLoading ? 'Chargement...' : 'Actualiser'}
          </Text>
        </TouchableOpacity>
      </View>

      {documents.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 50,
          }}
        >
          <Text style={{ fontSize: 48, marginBottom: 16 }}>📁</Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#666',
              marginBottom: 8,
            }}
          >
            Aucun document
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#999',
              textAlign: 'center',
              marginBottom: 20,
            }}
          >
            Vous n'avez pas encore ajouté de documents.{'\n'}
            Commencez par scanner un document !
          </Text>
          <MainButtonComponent
            title="Scanner un document"
            onPress={() => navigation.navigate('Scan')}
            icon='scan-outline'
          />
        </View>
      ) : (
        <View>
          {documents.map(item => (
            <DocumentItem key={item.id} item={item} />
          ))}
        </View>
      )}
    </View>
  );
};

export default DocumentComponent;
