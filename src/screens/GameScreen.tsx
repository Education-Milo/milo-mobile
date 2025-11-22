import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList, 
  Image, 
  Modal,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Swords, Trophy, Users, Globe, Zap, Search, X } from 'lucide-react-native';

// Imports internes
import TypographyComponent from '@components/Typography.component';
import Layout from '@components/Layout'; // Wrapper standard
import { colors } from '@theme/colors';

// --- Types & Mock Data ---

interface Player {
  id: string;
  name: string;
  avatar: any;
  score: number;
  rank: number;
  isOnline?: boolean;
}

// Données simulées pour le classement
const RANKING_GLOBAL: Player[] = [
  { id: '1', name: 'Emma W.', avatar: require('@assets/images/student_1.png'), score: 2450, rank: 1 },
  { id: '2', name: 'Lucas P.', avatar: require('@assets/images/student_2.png'), score: 2380, rank: 2 },
  { id: '3', name: 'Vous', avatar: require('@assets/images/mascot.png'), score: 2100, rank: 3 }, // L'utilisateur courant
  { id: '4', name: 'Sofia M.', avatar: require('@assets/images/student_3.png'), score: 1950, rank: 4 },
  { id: '5', name: 'Thomas R.', avatar: require('@assets/images/student_4.png'), score: 1820, rank: 5 },
];

const RANKING_FRIENDS: Player[] = [
  { id: '3', name: 'Vous', avatar: require('@assets/images/mascot.png'), score: 2100, rank: 1 },
  { id: '6', name: 'Chloé L.', avatar: require('@assets/images/student_5.png'), score: 1600, rank: 2 },
  { id: '7', name: 'Hugo B.', avatar: require('@assets/images/student_6.png'), score: 1450, rank: 3 },
];

// Amis en ligne pour le défi
const ONLINE_FRIENDS: Player[] = [
  { id: '6', name: 'Chloé L.', avatar: require('@assets/images/student_5.png'), score: 1600, rank: 2, isOnline: true },
  { id: '7', name: 'Hugo B.', avatar: require('@assets/images/student_6.png'), score: 1450, rank: 3, isOnline: true },
  { id: '2', name: 'Lucas P.', avatar: require('@assets/images/student_2.png'), score: 2380, rank: 1, isOnline: true },
];

// --- Composants ---

const GameScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<'global' | 'friends'>('global');
  const [modalVisible, setModalVisible] = useState(false);

  const currentData = activeTab === 'global' ? RANKING_GLOBAL : RANKING_FRIENDS;

  // Gestionnaires d'événements
  const handleRandomMatch = () => {
    console.log("Recherche d'un adversaire aléatoire...");
    // Logique de matchmaking ici
  };

  const handleChallengeFriend = (friend: Player) => {
    setModalVisible(false);
    console.log(`Défi envoyé à ${friend.name}`);
    // Navigation vers l'écran de jeu ou envoi de notif
  };

  const renderRankingItem = ({ item }: { item: Player }) => {
    const isMe = item.name === 'Vous';
    return (
      <View style={[styles.rankItem, isMe && styles.rankItemActive]}>
        <View style={styles.rankNumberContainer}>
          {item.rank <= 3 ? (
            <Trophy
              size={20}
              color={item.rank === 1 ? '#FFD700' : item.rank === 2 ? '#C0C0C0' : '#CD7F32'}
              fill={item.rank === 1 ? '#FFD700' : item.rank === 2 ? '#C0C0C0' : '#CD7F32'}
            />
          ) : (
            <TypographyComponent variant="h6" color={colors.text.secondary}>
              {item.rank}
            </TypographyComponent>
          )}
        </View>
        <Image source={item.avatar} style={styles.avatar} resizeMode="cover" />
        <View style={styles.rankInfo}>
          <TypographyComponent variant="h6" color={isMe ? colors.primary : colors.text.primary}>
            {item.name}
          </TypographyComponent>
          <TypographyComponent variant="labelSmall" color={colors.text.tertiary}>
            {item.score} XP
          </TypographyComponent>
        </View>
      </View>
    );
  };

  return (
    <Layout>
      <SafeAreaView style={styles.container}>
        {/* En-tête */}
        <View style={styles.header}>
          <TypographyComponent variant="h2" style={{textAlign: 'center', marginBottom: 4}}>
            Arène de Duel
          </TypographyComponent>
          <TypographyComponent variant="bodySmall" color={colors.text.secondary} style={{textAlign: 'center'}}>
            Affronte d'autres élèves et grimpe le classement !
          </TypographyComponent>
        </View>

        {/* Boutons d'action principaux */}
        <View style={styles.actionsContainer}>
          {/* Bouton Aléatoire */}
          <TouchableOpacity 
            style={[styles.actionCard, styles.shadow]} 
            onPress={handleRandomMatch}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={[colors.primary, '#FF6B00']}
              style={styles.actionGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.iconCircle}>
                <Zap size={32} color={colors.primary} fill={colors.primary} />
              </View>
              <View style={styles.actionTextContainer}>
                <TypographyComponent variant="h5" color={colors.white}>
                  Combat Aléatoire
                </TypographyComponent>
                <TypographyComponent variant="labelSmall" color={colors.white_70}>
                  Gagne des points bonus
                </TypographyComponent>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Bouton Défier Ami */}
          <TouchableOpacity 
            style={[styles.actionCard, styles.secondaryCard, styles.shadow]} 
            onPress={() => setModalVisible(true)}
            activeOpacity={0.9}
          >
             <View style={styles.actionContentRow}>
                <View style={[styles.iconCircle, { backgroundColor: '#FFF3E0' }]}>
                  <Swords size={28} color={colors.secondary} />
                </View>
                <View style={styles.actionTextContainer}>
                  <TypographyComponent variant="h6" color={colors.text.primary}>
                    Défier un ami
                  </TypographyComponent>
                  <TypographyComponent variant="labelSmall" color={colors.text.secondary}>
                    Choisis ton adversaire
                  </TypographyComponent>
                </View>
             </View>
          </TouchableOpacity>
        </View>

        {/* Section Classement */}
        <View style={styles.rankingContainer}>
          <View style={styles.rankingHeader}>
            <TypographyComponent variant="h5">Classement</TypographyComponent>
            {/* Toggle Switch */}
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[styles.toggleButton, activeTab === 'global' && styles.toggleActive]}
                onPress={() => setActiveTab('global')}
              >
                <Globe size={14} color={activeTab === 'global' ? colors.white : colors.text.secondary} />
                <TypographyComponent
                  variant="labelSmall"
                  style={[styles.toggleText, activeTab === 'global' && { color: colors.white }]}
                >
                   Global
                </TypographyComponent>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleButton, activeTab === 'friends' && styles.toggleActive]}
                onPress={() => setActiveTab('friends')}
              >
                <Users size={14} color={activeTab === 'friends' ? colors.white : colors.text.secondary} />
                <TypographyComponent
                  variant="labelSmall"
                  style={[styles.toggleText, activeTab === 'friends' && { color: colors.white }]}
                >
                   Amis
                </TypographyComponent>
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            data={currentData}
            renderItem={renderRankingItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>

        {/* Modal Liste d'amis */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TypographyComponent variant="h5">Défier un ami</TypographyComponent>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <X size={24} color={colors.text.secondary} />
                </TouchableOpacity>
              </View>
              <TypographyComponent variant="bodySmall" color={colors.text.secondary} style={{marginBottom: 16}}>
                Amis en ligne actuellement
              </TypographyComponent>

              <FlatList
                data={ONLINE_FRIENDS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.friendItem}>
                    <View style={styles.friendInfo}>
                      <View>
                        <Image source={item.avatar} style={styles.avatarSmall} />
                        <View style={styles.onlineDot} />
                      </View>
                      <TypographyComponent variant="body" style={{marginLeft: 12}}>
                        {item.name}
                      </TypographyComponent>
                    </View>
                    <TouchableOpacity
                      style={styles.challengeButton}
                      onPress={() => handleChallengeFriend(item)}
                    >
                      <TypographyComponent variant="label" style={{color: colors.white}}>
                        Défier
                      </TypographyComponent>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          </View>
        </Modal>

      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginVertical: 20,
    alignItems: 'center',
  },
  // Actions
  actionsContainer: {
    marginBottom: 24,
    gap: 16,
  },
  actionCard: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    height: 100,
  },
  secondaryCard: {
    backgroundColor: colors.white,
    height: 80,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  actionContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  actionTextContainer: {
    flex: 1,
  },
  shadow: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  // Ranking
  rankingContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    // Ombre légère vers le haut
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  rankingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 4,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    gap: 4,
  },
  toggleActive: {
    backgroundColor: colors.primary,
  },
  toggleText: {
    color: colors.text.secondary,
  },
  // Rank Item
  rankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  rankItemActive: {
    backgroundColor: '#FFF3E0', // Highlight pour l'utilisateur actuel
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  rankNumberContainer: {
    width: 30,
    alignItems: 'center',
    marginRight: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    backgroundColor: '#EEE',
  },
  rankInfo: {
    flex: 1,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: '50%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.success,
    borderWidth: 1.5,
    borderColor: colors.background,
  },
  challengeButton: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
});

export default GameScreen;