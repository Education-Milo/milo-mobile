import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native';
import { colors } from '@theme/colors';
import { useUserStore } from '@store/user/user.store';
import ProfileHeader from '@components/Profil/ProfileHeader.component';
import StatsSection from '@components/Profil/Statistics.component';
import BadgesSection from '@components/Profil/BadgeRow.component';
import AchievementsSection from '@components/Profil/AchievementsList.component';

const BADGES_DU_MOIS = [
  { id: '1', title: 'Défi Novembre', image: require('@assets/images/League/gold_league.webp'), status: 'completed' },
  { id: '2', title: 'Roi du Calcul', image: require('@assets/images/League/ruby_league.webp'), status: 'progress' },
];

const SUCCES_RECENTS = [
  { id: '1', title: 'Lève-tôt', desc: 'Terminer une leçon avant 8h', progress: 3, total: 3 },
  { id: '2', title: 'Erudit', desc: 'Apprendre 50 nouveaux mots', progress: 42, total: 50 },
  { id: '3', title: 'Imbattable', desc: '10 leçons sans faute', progress: 7, total: 10 },
];

const ProfileScreen = () => {
  const user = useUserStore((state) => state.user);

  // Données utilisateur fictives
  const stats = {
    streak: 12,
    totalXp: 2450,
    league: 'Or',
    lastCourse: 'Maths - Chap 2',
  };

  const Separator = () => <View style={styles.separator} />;

  return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader user={user} />
        <Separator />
        <StatsSection stats={stats} />
        <Separator />
        <BadgesSection badges={BADGES_DU_MOIS} />
        <Separator />
        <AchievementsSection achievements={SUCCES_RECENTS} />
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  separator: {
    height: 2,
    backgroundColor: '#E5E5E5',
    marginVertical: 4,
  },
});

export default ProfileScreen;