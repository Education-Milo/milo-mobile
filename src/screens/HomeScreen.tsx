import React from 'react';
import { Image, ScrollView, TouchableOpacity, View, Modal, StyleSheet } from 'react-native';
import Header from '@components/Header.component';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import TypographyComponent from '@components/Typography.component';
import { colors } from '@theme/colors';
import WelcomeCard from '@components/Cards/WelcomeCard.component';
import { useHomeScreen } from '@hooks/useHomeScreen';
import { useUserStore } from '@store/user/user.store';
import {
  AuthStackParamList,
  HomeTabsParamList,
  AuthScreenNames,
} from '@navigation/Auth/authNavigator.model';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import AchievementCard from '@components/Home/AchievementCard.component';
import HomeMissions from '@components/Home/HomeMIssions';
import HomeRecommended from '@components/Home/HomeRecommended';
import { useTranslation } from 'react-i18next';

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<HomeTabsParamList, 'Home'>,
  NativeStackNavigationProp<AuthStackParamList>
>;

interface Achievement {
  id: number;
  title: string;
  date: string;
  icon: string;
}

const HomeScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const {
    dailyMissions,
    completedMissions,
    totalMissions,
    error,
  } = useHomeScreen();

  const user = useUserStore(state => state.user);

  const recentAchievements: Achievement[] = [
    { id: 1, title: "Mathématicien", date: "15/01/2024", icon: "🏅"},
    { id: 2, title: "Lecteur assidu", date: "20/01/2024", icon: "📚"},
    { id: 3, title: "Champion", date: "25/01/2024", icon: "🏆"},
  ];

  return (
    <View style={styles.homeContainer}>
      <Header
        userPoints={450}
        streakDays={3}
        showNotifications={true}
        showPoints={true}
        showStreak={true}
        showSettings={false}
        navigation={navigation}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <WelcomeCard
          userName={user?.first_name}
          onPress={() => navigation.navigate(AuthScreenNames.Lesson)}
        />

        <HomeMissions
          dailyMissions={dailyMissions}
          completedMissions={completedMissions}
          totalMissions={totalMissions}
        />
        <HomeRecommended
          hasBulletin={false}
          onScanPress={() => navigation.navigate(AuthScreenNames.Scan)}
        />
        <View style={styles.achievementsSection}>
          <View style={styles.sectionHeader}>
            <TypographyComponent variant='h4' color={colors.primary}>
              {t("home.achievements.title")}
            </TypographyComponent>
          </View>
          <View style={{ flexDirection: 'row', gap: 12, paddingHorizontal: 4 }}>
            {recentAchievements.map((achievement, index) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                index={index}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {error && (
        <TypographyComponent style={{ color: 'red', textAlign: 'center', margin: 10 }}>
          {error}
        </TypographyComponent>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  achievementsSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  achievementsList: {
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 30,
    backgroundColor: '#FFF0F0',
  },
});

export default HomeScreen;