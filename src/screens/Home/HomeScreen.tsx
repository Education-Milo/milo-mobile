import React, { useState, useEffect } from 'react';
import { Image, ScrollView, TouchableOpacity, View, Modal } from 'react-native';
import styles from '@constants/Colors';
import Layout from '@components/Layout';
import Header from '@components/Header.component';
import { RootStackParamList } from '@navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import TypographyComponent from '@components/Typography.component';
import { colors } from '@themes/colors';
import HomeFooter from '@components/Home/HomeFooter.component';
import { fakeRecentCourses, fakeDailyMissions } from '@api/fake-data-api';
import HomeGame from '@components/Home/HomeGame.component';
import Card from '@components/Card.component';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface HomeScreenProps {
  navigation: NavigationProp;
}

// Types pour les missions et cours
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
  progress: number; // Ajout du pourcentage de progression
  color: string; // Couleur pour chaque matière
}

interface Achievement {
  id: number;
  title: string;
  date: string;
  icon: string;
}

function Home({ navigation }: HomeScreenProps) {
  const [recentCourses, setRecentCourses] = useState<Course[]>([]);
  const [dailyMissions, setDailyMissions] = useState<Mission[]>([]);
  const [recentAchievements] = useState<Achievement[]>([
    { id: 1, title: "Mathématicien", date: "15/01/2024", icon: "🏅" },
    { id: 2, title: "Lecteur assidu", date: "20/01/2024", icon: "🏅" },
  ]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // Remplace par ton appel API réel
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setRecentCourses(data);
        } else {
          setError('Aucun cours trouvé.');
          setRecentCourses([]);
        }
      })
      .catch(() => {
        setRecentCourses(fakeRecentCourses);
      });

    fetch('/api/missions')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setDailyMissions(data);
        } else {
          setError('Aucune mission trouvée.');
          setDailyMissions([]);
        }
      })
      .catch(() => {
        setDailyMissions(fakeDailyMissions);
      });
  }, []);

  // Calcul des missions complétées
  const completedMissions = dailyMissions.filter(mission => mission.isCompleted).length;
  const totalMissions = dailyMissions.length;

  // Navigation vers la page cours
  const navigateToCourse = (courseId: number) => {
    navigation.navigate('Lesson');
  };

  const handleMenuPress = (courseId: number) => {
    setSelectedCourseId(courseId);
    setShowMenu(true);
  };

  const handleMenuClose = () => {
    setShowMenu(false);
    setSelectedCourseId(null);
  };

  const handleDeleteCourse = () => {
    // Logique de suppression à implémenter
    handleMenuClose();
  };

  const handleAccessCourse = () => {
    if (selectedCourseId) {
      navigateToCourse(selectedCourseId);
    }
    handleMenuClose();
  };

  return (
    <Layout navigation={navigation}>
      <View style={styles.homeContainer}>
        <Header
          userPoints={450}
          streakDays={3}
          showNotifications={true}
          showPoints={true}
          showStreak={true}
        />
        <ScrollView>
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
          {/* Conteneur avec flexDirection row */}
          <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
            {recentAchievements.map((achievement) => (
              <Card
                key={achievement.id}
                variant='achievement'
                title={achievement.title}
                description={achievement.date}
                style={{ width: 150, height: 120, marginRight: 5 }}
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
          <TypographyComponent style={{ color: 'red', textAlign: 'center', margin: 10 }}>{error}</TypographyComponent>
        )}
      </View>
    </Layout>
  );
}

export default Home;