import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Image,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '@constants/Colors';
import DocumentComponent from '@components/Profil/DocumentComponent';
import StatisticsComponent from '@components/Profil/StatisticsComponent';
import { RootStackParamList } from '@navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Layout from '@components/Layout';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ProfilScreenProps {
  navigation: NavigationProp;
}

const localStyles = StyleSheet.create({
  headerSection: {
    backgroundColor: '#FF8C00',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    marginBottom: 20,
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
    marginRight: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  avatarText: {
    color: '#FF8C00',
    fontSize: 20,
    fontWeight: 'bold',
  },
  crownContainer: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#FFD700',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 2,
  },
  profileLevel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 5,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
  },
  progressContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 15,
    padding: 15,
    width: '100%',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    color: 'white',
    fontSize: 13,
  },
  progressBarContainer: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
  },
  progressBar: {
    width: '83%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 3,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    minWidth: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statEmoji: {
    fontSize: 24,
    marginBottom: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  congratulationCard: {
    backgroundColor: '#FFECE0',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 30,
    borderLeftWidth: 4,
    borderLeftColor: '#FF8C00',
  },
  congratulationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  congratulationEmoji: {
    fontSize: 24,
    marginRight: 10,
  },
  congratulationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginBottom: 5,
  },
  congratulationText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  tabsContainer: {
    paddingHorizontal: 20,
  },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 25,
    flex: 1,
    marginRight: 10,
    justifyContent: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#FF8C00',
  },
  tabButtonInactive: {
    backgroundColor: '#F5F5F5',
  },
  tabText: {
    fontSize: 16,
  },
  tabTextActive: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  tabTextInactive: {
    color: '#666',
  },
  contentContainer: {
    width: '100%',
    marginBottom: 20,
  },
});

function ProfilScreen({ navigation }: ProfilScreenProps) {
  const [activeTab, setActiveTab] = useState<'statistics' | 'documents'>(
    'statistics'
  );
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

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
          {/* Section profil avec header intégré */}
          <View style={localStyles.headerSection}>
            {/* Header intégré transparent */}
            <View style={localStyles.headerContainer}>
              <View>
                <Image
                  source={require('@assets/images/logo_sans_fond.png')}
                  style={styles.smallLogo}
                />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Notifications')}
                  style={localStyles.headerButton}
                >
                  <Ionicons
                    name='notifications-outline'
                    size={20}
                    color='white'
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Settings')}
                  style={[localStyles.headerButton, { marginRight: 0 }]}
                >
                  <Ionicons name='options-outline' size={20} color='white' />
                </TouchableOpacity>
              </View>
            </View>

            {/* Profil utilisateur */}
            <View style={localStyles.profileContainer}>
              <View style={localStyles.avatarContainer}>
                <View style={localStyles.avatar}>
                  <Text style={localStyles.avatarText}>T</Text>
                </View>
                <View style={localStyles.crownContainer}>
                  <Text style={{ fontSize: 12 }}>👑</Text>
                </View>
              </View>
              <View style={localStyles.profileInfo}>
                <Text style={localStyles.profileName}>Thomas</Text>
                <Text style={localStyles.profileLevel}>Niveau 12</Text>
                <View style={localStyles.pointsContainer}>
                  <Text style={{ fontSize: 14, marginRight: 3 }}>⭐</Text>
                  <Text style={localStyles.pointsText}>8945 points</Text>
                </View>
              </View>
            </View>

            {/* Barre de progression */}
            <View style={localStyles.progressContainer}>
              <View style={localStyles.progressHeader}>
                <Text style={localStyles.progressText}>
                  Progression vers le niveau 13
                </Text>
                <Text
                  style={[localStyles.progressText, { fontWeight: 'bold' }]}
                >
                  1247/1500 XP
                </Text>
              </View>
              <View style={localStyles.progressBarContainer}>
                <View style={localStyles.progressBar} />
              </View>
            </View>
          </View>

          {/* Statistiques rapides */}
          <View style={localStyles.statsContainer}>
            <View style={localStyles.statCard}>
              <Text style={localStyles.statEmoji}>🔥</Text>
              <Text style={localStyles.statValue}>7</Text>
              <Text style={localStyles.statLabel}>Série{'\n'}actuelle</Text>
            </View>
            <View style={localStyles.statCard}>
              <Text style={localStyles.statEmoji}>📚</Text>
              <Text style={localStyles.statValue}>47</Text>
              <Text style={localStyles.statLabel}>Documents{'\n'}scannés</Text>
            </View>
            <View style={localStyles.statCard}>
              <Text style={localStyles.statEmoji}>🏆</Text>
              <Text style={localStyles.statValue}>23</Text>
              <Text style={localStyles.statLabel}>Défis{'\n'}terminés</Text>
            </View>
          </View>

          {/* Message de félicitation */}
          <View style={localStyles.congratulationCard}>
            <View style={localStyles.congratulationContent}>
              <Text style={localStyles.congratulationEmoji}>🤩</Text>
              <View style={{ flex: 1 }}>
                <Text style={localStyles.congratulationTitle}>
                  Impressionnant !
                </Text>
                <Text style={localStyles.congratulationText}>
                  Tu es dans le top 15% des apprenants de ta classe d'âge.
                  Continue comme ça ! ⭐
                </Text>
              </View>
            </View>
          </View>

          {/* Onglets */}
          <View style={localStyles.tabsContainer}>
            <View style={localStyles.tabsRow}>
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
                  { marginRight: 0 },
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
            <View style={localStyles.contentContainer}>
              {activeTab === 'statistics' ? (
                <StatisticsComponent onRefresh={onRefresh} />
              ) : (
                <DocumentComponent onRefresh={onRefresh} />
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
}

export default ProfilScreen;
