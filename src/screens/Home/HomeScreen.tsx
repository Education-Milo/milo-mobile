import React from 'react';
import { Image, ScrollView, TouchableOpacity, View, Modal } from 'react-native';
import styles from '@navigation/constants/Colors';
import Layout from '@components/Layout';
import Header from '@components/Header.component';
import { RootStackParamList } from '@navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import TypographyComponent from '@components/Typography.component';
import { colors } from '@themes/colors';
import HomeFooter from '@components/Home/HomeFooter.component';
import HomeGame from '@components/Home/HomeGame.component';
import Card from '@components/Card.component';
import WelcomeCard from '@components/Cards/WelcomeCard.component';
import { useHomeScreen } from '@hook/useHomeScreen';
import { useUserStore } from '@store/user/user.store';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface HomeScreenProps {
  navigation: NavigationProp;
}

interface Mission {
  id: number;
  title: string;
  description: string;
  category: string;
  points: number;
  isCompleted: boolean;
}

interface Course {
  id: number;
  subject: string;
  title: string;
  lastAccessed: string;
  progress: number;
  color: string;
}

interface Achievement {
  id: number;
  title: string;
  date: string;
  icon: string;
}

function Home({ navigation }: HomeScreenProps) {
  const {
    recentCourses,
    dailyMissions,
    completedMissions,
    totalMissions,
    error,
    showMenu,
    handleMenuPress,
    handleMenuClose,
    handleDeleteCourse,
    handleAccessCourse,
    navigateToCourse,
  } = useHomeScreen({ navigation });

  const user = useUserStore(state => state.user);

  const recentAchievements: Achievement[] = [
    { id: 1, title: "Mathématicien", date: "15/01/2024", icon: "🏅" },
    { id: 2, title: "Lecteur assidu", date: "20/01/2024", icon: "🏅" },
  ];

  return (
    <Layout navigation={navigation}>
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
            userName={user?.prenom}
            onPress={() => navigation.navigate('Lesson')}
          />

          <HomeGame
            dailyMissions={dailyMissions}
            completedMissions={completedMissions}
            totalMissions={totalMissions}
            styles={styles}
            colors={colors}
          />

          <View style={styles.achievementsSection}>
            <View style={styles.sectionHeader}>
              <TypographyComponent variant='h4' color={colors.primary}>
                Derniers succès 🏆
              </TypographyComponent>
            </View>
            <View style={{ flexDirection: 'column', paddingHorizontal: 10 }}>
              {recentAchievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  variant='achievement'
                  title={achievement.title}
                  description={achievement.date}
                  style={{ height: 120, marginRight: 5 }}
                />
              ))}
            </View>
          </View>

          {/* Section Mes Cours */}
          <HomeFooter
            recentCourses={recentCourses}
            navigateToCourse={navigateToCourse}
            handleMenuPress={handleMenuPress}
            styles={styles}
          />
        </ScrollView>

        {/* Menu Modal */}
        <Modal
          visible={showMenu}
          transparent={true}
          animationType="fade"
          onRequestClose={handleMenuClose}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            activeOpacity={1}
            onPress={handleMenuClose}
          >
            <View>
              <TouchableOpacity
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderRadius: 30,
                  backgroundColor: '#FFF0F0'
                }}
                onPress={handleAccessCourse}
              >
                <TypographyComponent variant='body'>Accéder au cours</TypographyComponent>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderRadius: 30,
                  marginTop: 4,
                  backgroundColor: '#FFF0F0',
                }}
                onPress={handleDeleteCourse}
              >
                <TypographyComponent variant='body' style={{ textAlign: 'center' }} color={colors.text.deleted}>
                  Supprimer
                </TypographyComponent>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        {error && (
          <TypographyComponent style={{ color: 'red', textAlign: 'center', margin: 10 }}>
            {error}
          </TypographyComponent>
        )}
      </View>
    </Layout>
  );
}

export default Home;