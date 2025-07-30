import React, { useState } from 'react';
import { Image, TouchableOpacity, View, ViewStyle, ImageStyle, Modal, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TypographyComponent from './Typography.component';
import { colors } from '@themes/colors';
interface HeaderProps {
  notificationCount?: number;
  userPoints?: number;
  streakDays?: number;
  showNotifications?: boolean;
  showPoints?: boolean;
  showStreak?: boolean;
  showSettings?: boolean;
  backgroundColor?: string;
  navigation?: any;
}

function Header({
  notificationCount = 0,
  userPoints = 0,
  streakDays = 0,
  showNotifications = true,
  showPoints = true,
  showStreak = true,
  showSettings = true,
  backgroundColor = 'transparent',
  navigation,
}: HeaderProps) {

  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);

  const openSettingsModal = async () => {
    setIsSettingsModalVisible(true);
  };

  const closeSettingsModal = async () => {
    setIsSettingsModalVisible(false);
  };

  return (
    <>
    <View style={[viewStyles.header, { backgroundColor }]}>
      <Image
        source={require('@assets/images/logo_sans_fond.png')}
        style={localStyles.smallLogo}
      />
      {/* Partie droite avec notifications, points et streak */}
      <View style={viewStyles.headerRight}>
        {showPoints && (
          <View style={viewStyles.pointsButton}>
            <TypographyComponent
              variant='bodySmall'
              style={{ fontSize: 14 }}
              color={colors.white}
            >
              🔸 {userPoints}
            </TypographyComponent>
          </View>
        )}
        {showStreak && (
          <View style={viewStyles.streakContainer}>
            <TypographyComponent
              variant='bodySmall'
              style={{ fontSize: 14 }}
              color={colors.white}
            >
              🔥 {streakDays}
            </TypographyComponent>
          </View>
        )}
        {showNotifications && (
          <TouchableOpacity
            style={viewStyles.notificationContainer}
            onPress={() => {
              console.log('Notification pressée');
            }}
          >
            <View style={viewStyles.notificationBadge}>
              <Ionicons name="notifications-outline" size={18} color="#666" />
            </View>
            {notificationCount > 0 && (
              <View style={viewStyles.redDot}/>
            )}
          </TouchableOpacity>
        )}
        {showSettings && (
          <TouchableOpacity onPress={openSettingsModal}>
            <Ionicons name="options-outline" size={24} color="#666" />
          </TouchableOpacity>
        )}
      </View>
    </View>
        <Modal
        animationType="slide"
        transparent={true}
        visible={isSettingsModalVisible}
        onRequestClose={closeSettingsModal}
      >
        <View style={viewStyles.modalOverlay}>
          <View style={viewStyles.modalContent}>
            <View style={viewStyles.modalHeader}>
              <TypographyComponent
                variant='h4'
                style={{}}
                color={colors.text.title}
              >
                Paramètres
              </TypographyComponent>
              <TouchableOpacity onPress={closeSettingsModal}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <View style={viewStyles.settingsOptions}>
              <TouchableOpacity style={viewStyles.settingItem}>
                <Ionicons name="shield-outline" size={20} color="#666" />
                <TypographyComponent style={{}} variant='body'>Confidentialité</TypographyComponent>
              </TouchableOpacity>
              <TouchableOpacity style={viewStyles.settingItem}>
                <Ionicons name="help-circle-outline" size={20} color="#666" />
                <TypographyComponent style={{}}variant='body'>Aide</TypographyComponent>
              </TouchableOpacity>
              <TouchableOpacity style={viewStyles.settingItem}
               onPress={async () => {
                const { useAuthStore } = await import('@store/auth/auth.store');
                await useAuthStore.getState().logout();
                // Suppression de navigation.navigate('Login') car la déconnexion va automatiquement changer de navigateur
              }}>
                <Ionicons name="log-out-outline" size={20} color="#ff3b30" />
                <TypographyComponent style={{color: '#ff3b30'}} variant='body'>Déconnexion</TypographyComponent>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const localStyles = {
  smallLogo: {
    width: 70,
    height: 35,
  } as ImageStyle,
} as const;

const viewStyles: { [key: string]: ViewStyle } = {
  header: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 20,
  },
  headerRight: {
    flexDirection: 'row' as const,
    alignItems: 'center',
    gap: 12,
  },
  pointsButton: {
    backgroundColor: '#FFD100', // #0055FF Bleu ROI | #004E7C Bleu pétrole | #FFD100 Jaune doré | #FFE680 Jaune pastel | #FFCF40 jaune sable
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row' as const,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  streakContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center',
    backgroundColor: '#ff9500',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationContainer: {
    position: 'relative' as const,
  },
  notificationBadge: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  redDot: {
    position: 'absolute' as const,
    top: 2,
    right: 2,
    backgroundColor: '#ff3b30',
    borderRadius: 6,
    width: 12,
    height: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#F6EBDF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingsOptions: {
    gap: 16,
  },
  settingItem: {
    flexDirection: 'row' as const,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.background,
    borderRadius: 12,
    gap: 12,
  },
};

export default Header;