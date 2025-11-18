import React from 'react';
import { StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Layout from '@components/Layout';
import { AuthStackParamList } from '@navigation/Auth/authNavigator.model';
import { useMissionsScreen } from '@hooks/useMissionsScreen';
import MonthlyChallengeCard from '@components/missions/MonthlyChallengeCard.component';
import DailyMissionsCard from '@components/missions/DailyMissionsCard.component';
import BadgeCalendarCard from '@components/missions/BadgeCalendarCard.component';

type MissionsScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const MissionsScreen = () => {
  const navigation = useNavigation<MissionsScreenNavigationProp>();
  const {
    user,
    dailyMissions,
    monthlyChallenge,
    badgesByYear,
    sortedYears
  } = useMissionsScreen();

  return (
    <Layout>
      <Animated.ScrollView
        entering={FadeInDown.duration(600).springify()}
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <MonthlyChallengeCard challenge={monthlyChallenge} />
        <DailyMissionsCard missions={dailyMissions} />
        <BadgeCalendarCard 
          badgesByYear={badgesByYear} 
          sortedYears={sortedYears} 
        />
      </Animated.ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F1',
  },
});

export default MissionsScreen;