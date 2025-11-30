import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Settings } from 'lucide-react-native';
import TypographyComponent from '@components/Typography.component';
import { colors } from '@theme/colors';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '@navigation/Auth/authNavigator.model';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface ProfileHeaderProps {
  user: any
}

type ProfilHeaderNavigationProp = NativeStackNavigationProp<AuthStackParamList>;


const ProfileHeader = ({ user }: ProfileHeaderProps) => {
    const navigation = useNavigation<ProfilHeaderNavigationProp>();
  return (
    <View style={styles.header}>
      <View style={styles.headerTopRow}>
        <TouchableOpacity style={styles.iconButton}>
          <Settings size={24} color={colors.text.secondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.profileInfo}>
        <View style={styles.avatarContainer}>
          <Image
            source={require('@assets/images/avatars/profil_picture1.png')}
            style={styles.avatar}
          />
          <View style={styles.flagBadge}>
            <TypographyComponent variant="h6" style={{ fontSize: 12 }}>🇫🇷</TypographyComponent>
          </View>
        </View>
        <TypographyComponent variant="h3" style={{ marginTop: 12 }}>
          {user?.prenom} {user?.nom}
        </TypographyComponent>
        <TypographyComponent variant="body" color={colors.text.tertiary}>
          Élève motivé • A rejoint en 2024
        </TypographyComponent>
        <TouchableOpacity
        style={styles.addFriendButton}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('EditProfileScreen')}>
          <TypographyComponent variant="button" color="#FFF">
            Modifier le profil
          </TypographyComponent>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
  },
  headerTopRow: {
    flexDirection: 'row-reverse',
    marginBottom: 10,
  },
  iconButton: {
    padding: 8,
  },
  profileInfo: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#E5E5E5',
  },
  flagBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    elevation: 2,
  },
  addFriendButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginTop: 20,
    alignItems: 'center',
  },
});

export default ProfileHeader;