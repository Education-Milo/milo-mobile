import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Modal,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '@constants/Colors';
import DocumentComponent from '@components/Profil/DocumentComponent';
import StatisticsComponent from '@components/Profil/StatisticsComponent';
import { RootStackParamList } from '@navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Layout from '@components/Layout';
import { useUserStore } from '@store/user/user.store';
import Header from '@components/Header.component';
import TypographyComponent from '@components/Typography.component';
import { colors } from '@themes/colors';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ProfilScreenProps {
  navigation: NavigationProp;
}

const { width } = Dimensions.get('window');

const AVATAR_IMAGES = [
  { id: 1, source: require('@assets/images/avatars/profil_picture1.png') },
  { id: 2, source: require('@assets/images/avatars/profil_picture2.jpg') },
  { id: 3, source: require('@assets/images/avatars/profil_picture3.png') },
  { id: 4, source: require('@assets/images/avatars/profil_picture4.png') },
];

const localStyles = StyleSheet.create({
  headerSection: {
    backgroundColor: '#FF8C00',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 30,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  headerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 8,
    marginLeft: 10,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FF8C00',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'white',
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  joinedDate: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 40,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
  },
  contentSection: {
    backgroundColor: '#FFF8F1',
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  progressCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressText: {
    color: '#666',
    fontSize: 14,
  },
  progressValue: {
    color: '#FF8C00',
    fontSize: 14,
    fontWeight: 'bold',
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    height: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  chart: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  chartBar: {
    backgroundColor: '#FF8C00',
    width: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  chartLabel: {
    color: '#666',
    fontSize: 12,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 25,
  },
  tabButtonActive: {
    backgroundColor: '#FF8C00',
  },
  tabButtonInactive: {
    backgroundColor: '#F5F5F5',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextActive: {
    color: 'white',
  },
  tabTextInactive: {
    color: '#666',
  },
  // Styles pour la modal de sélection d'avatar
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: width * 0.85,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  avatarGrid: {
    paddingBottom: 20,
  },
  avatarOption: {
    width: (width * 0.85 - 80) / 3,
    aspectRatio: 1,
    margin: 5,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'transparent',
  },
  avatarOptionSelected: {
    borderColor: '#FF8C00',
  },
  avatarOptionImage: {
    width: '100%',
    height: '100%',
  },
  resetAvatarButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  resetAvatarText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#FF8C00',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

function ProfilScreen({ navigation }: ProfilScreenProps) {
  const [activeTab, setActiveTab] = useState<'statistics' | 'documents'>(
    'statistics'
  );
  const [refreshing, setRefreshing] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [currentAvatar, setCurrentAvatar] = useState<number | null>(null);

  const { user, loading, getMe, getFullName, getInitials } = useUserStore();
  useEffect(() => {
    if (!user) {
      getMe();
    }
  }, []);

  useEffect(() => {
    if (user?.avatarId) {
      setCurrentAvatar(user.avatarId);
    }
  }, [user]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await getMe(true);
    } finally {
      setRefreshing(false);
    }
  };

  const handleAvatarPress = () => {
    setSelectedAvatar(currentAvatar);
    setShowAvatarModal(true);
  };

  const handleAvatarSelect = (avatarId: number) => {
    setSelectedAvatar(avatarId);
  };

  const handleResetAvatar = () => {
    setSelectedAvatar(null);
  };

  const handleSaveAvatar = async () => {
    try {
      setCurrentAvatar(selectedAvatar);
      setShowAvatarModal(false);
      await getMe(true);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'avatar:', error);
    }
  };

  const renderAvatar = () => {
    if (currentAvatar) {
      const avatarImage = AVATAR_IMAGES.find(img => img.id === currentAvatar);
      if (avatarImage) {
        return (
          <Image
            source={avatarImage.source}
            style={localStyles.avatarImage}
            resizeMode="cover"
          />
        );
      }
    }
    return (
      <TypographyComponent style={localStyles.avatarText}>
        {getInitials()}
      </TypographyComponent>
    );
  };

  const renderAvatarOption = ({ item }: { item: typeof AVATAR_IMAGES[0] }) => (
    <TouchableOpacity
      style={[
        localStyles.avatarOption,
        selectedAvatar === item.id && localStyles.avatarOptionSelected,
      ]}
      onPress={() => handleAvatarSelect(item.id)}
    >
      <Image
        source={item.source}
        style={localStyles.avatarOptionImage}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  if (loading && !user) {
    return (
      <Layout navigation={navigation}>
        <View style={[styles.homeContainer, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color="#FF8C00" />
        </View>
      </Layout>
    );
  }

  return (
    <Layout navigation={navigation}>
      <View style={styles.homeContainer}>
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#FF8C00']}
            />
          }
        >
          {/* Section Header avec profil */}
          <View style={localStyles.headerSection}>
            <Header
              userPoints={450}
              streakDays={3}
              showNotifications={true}
              showPoints={false}
              showStreak={false}
            />
            {/* Profil utilisateur centré */}
            <View style={localStyles.profileContainer}>
              <View style={localStyles.avatarContainer}>
                <TouchableOpacity
                  style={localStyles.avatar}
                  onPress={handleAvatarPress}
                  activeOpacity={0.8}
                >
                  {renderAvatar()}
                </TouchableOpacity>
                <TouchableOpacity
                  style={localStyles.editAvatarButton}
                  onPress={handleAvatarPress}
                  activeOpacity={0.8}
                >
                  <Ionicons name="pencil" size={16} color="#FF8C00" />
                </TouchableOpacity>
              </View>
              <TypographyComponent
                style={{}}
                color={colors.text.white}
                variant='h3'>
                  {getFullName()}
              </TypographyComponent>
              <TypographyComponent style={localStyles.joinedDate}>
                @{getFullName()} • {user?.classe || '6ème'}
              </TypographyComponent>
              {/* Statistiques en ligne */}
              <View style={localStyles.statsRow}>
                <View style={localStyles.statItem}>
                  <TypographyComponent style={localStyles.statNumber}>{user?.miloro || 0}</TypographyComponent>
                  <TypographyComponent style={localStyles.statLabel}>Miloro</TypographyComponent>
                </View>
                <View style={localStyles.statItem}>
                  <TypographyComponent style={localStyles.statNumber}>{user?.level || 0}</TypographyComponent>
                  <TypographyComponent style={localStyles.statLabel}>Niveau</TypographyComponent>
                </View>
                <View style={localStyles.statItem}>
                  <TypographyComponent style={localStyles.statNumber}>{user?.points || 0}</TypographyComponent>
                  <TypographyComponent style={localStyles.statLabel}>Points</TypographyComponent>
                </View>
              </View>
            </View>
          </View>

          {/* Section contenu */}
          <View style={localStyles.contentSection}>
            <TypographyComponent style={localStyles.progressTitle}>Progression hebdomadaire</TypographyComponent>
            {/* Carte de progression */}
            <View style={localStyles.progressCard}>
              <View style={localStyles.progressRow}>
                <TypographyComponent style={localStyles.progressText}>Cette semaine</TypographyComponent>
                <TypographyComponent style={localStyles.progressValue}>36 leçons</TypographyComponent>
              </View>
              <View style={localStyles.progressRow}>
                <TypographyComponent style={localStyles.progressText}>Semaine dernière</TypographyComponent>
                <TypographyComponent style={localStyles.progressValue}>74 leçons</TypographyComponent>
              </View>
            </View>

            {/* Onglets */}
            <View style={localStyles.tabsContainer}>
              <TouchableOpacity
                style={[
                  localStyles.tabButton,
                  activeTab === 'documents'
                    ? localStyles.tabButtonActive
                    : localStyles.tabButtonInactive,
                ]}
                onPress={() => setActiveTab('documents')}
              >
                <Text
                  style={[
                    localStyles.tabText,
                    activeTab === 'documents'
                      ? localStyles.tabTextActive
                      : localStyles.tabTextInactive,
                  ]}
                >
                  📁 Mes Documents
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  localStyles.tabButton,
                  activeTab === 'statistics'
                    ? localStyles.tabButtonActive
                    : localStyles.tabButtonInactive,
                ]}
                onPress={() => setActiveTab('statistics')}
              >
                <Text
                  style={[
                    localStyles.tabText,
                    activeTab === 'statistics'
                      ? localStyles.tabTextActive
                      : localStyles.tabTextInactive,
                  ]}
                >
                  📊 Mes Statistiques
                </Text>
              </TouchableOpacity>
            </View>

            {/* Contenu selon l'onglet actif */}
            {activeTab === 'statistics' ? (
              <StatisticsComponent onRefresh={onRefresh} />
            ) : (
              <DocumentComponent onRefresh={onRefresh} />
            )}
          </View>
        </ScrollView>

        {/* Modal de sélection d'avatar */}
        <Modal
          visible={showAvatarModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowAvatarModal(false)}
        >
          <View style={localStyles.modalOverlay}>
            <View style={localStyles.modalContent}>
              <View style={localStyles.modalHeader}>
                <TypographyComponent style={localStyles.modalTitle}>
                  Choisir un avatar
                </TypographyComponent>
                <TouchableOpacity
                  style={localStyles.closeButton}
                  onPress={() => setShowAvatarModal(false)}
                >
                  <Ionicons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>

              <FlatList
                data={AVATAR_IMAGES}
                renderItem={renderAvatarOption}
                numColumns={3}
                keyExtractor={(item) => item.id.toString()}
                style={localStyles.avatarGrid}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
              />

              <TouchableOpacity
                style={localStyles.resetAvatarButton}
                onPress={handleResetAvatar}
              >
                <TypographyComponent style={localStyles.resetAvatarText}>
                  Utiliser les initiales
                </TypographyComponent>
              </TouchableOpacity>

              <TouchableOpacity
                style={localStyles.saveButton}
                onPress={handleSaveAvatar}
              >
                <TypographyComponent style={localStyles.saveButtonText}>
                  Sauvegarder
                </TypographyComponent>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </Layout>
  );
}

export default ProfilScreen;