import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Swords, Trophy, Users, Globe, Zap, X } from 'lucide-react-native';
import TypographyComponent from '@components/Typography.component';
import Layout from '@components/Layout';
import { colors } from '@theme/colors';
import { useGameScreen, type Player } from '@hooks/useGameScreen';


const GameScreen = () => {
  const {
    activeTab,
    setActiveTab,
    modalVisible,
    currentData,
    onlineFriends,
    handleRandomMatch,
    handleChallengeFriend,
    openChallengeModal,
    closeChallengeModal,
  } = useGameScreen();

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

  const renderFriendItem = ({ item }: { item: Player }) => (
    <View style={styles.friendItem}>
      <View style={styles.friendInfo}>
        <View>
          <Image source={item.avatar} style={styles.avatarSmall} />
          <View style={styles.onlineDot} />
        </View>
        <TypographyComponent variant="body" style={{ marginLeft: 12 }}>
          {item.name}
        </TypographyComponent>
      </View>
      <TouchableOpacity
        style={styles.challengeButton}
        onPress={() => handleChallengeFriend(item)}
      >
        <TypographyComponent variant="label" style={{ color: colors.white }}>
          Défier
        </TypographyComponent>
      </TouchableOpacity>
    </View>
  );

  return (
    <Layout>
      <SafeAreaView style={styles.container}>
        {/* En-tête */}
        <View style={styles.header}>
          <TypographyComponent variant="h2" style={{ textAlign: 'center', marginBottom: 4 }}>
            Arène de Duel
          </TypographyComponent>
          <TypographyComponent variant="bodySmall" color={colors.text.secondary} style={{ textAlign: 'center' }}>
            Affronte d'autres élèves et grimpe le classement !
          </TypographyComponent>
        </View>

        {/* Boutons d'action principaux */}
        <View style={styles.actionsContainer}>
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

          <TouchableOpacity
            style={[styles.actionCard, styles.secondaryCard, styles.shadow]}
            onPress={openChallengeModal}
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
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>

        {/* Modal Liste d'amis */}
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={closeChallengeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TypographyComponent variant="h5">Défier un ami</TypographyComponent>
                <TouchableOpacity onPress={closeChallengeModal}>
                  <X size={24} color={colors.text.secondary} />
                </TouchableOpacity>
              </View>
              <TypographyComponent variant="bodySmall" color={colors.text.secondary} style={{ marginBottom: 16 }}>
                Amis en ligne actuellement
              </TypographyComponent>

              <FlatList
                data={onlineFriends}
                keyExtractor={item => item.id}
                renderItem={renderFriendItem}
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
  rankingContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    shadowColor: '#000',
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
  rankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  rankItemActive: {
    backgroundColor: '#FFF3E0',
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
