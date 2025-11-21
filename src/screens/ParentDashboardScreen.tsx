import React from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Components
import Layout from '@components/Layout';
import Header from '@components/Header.component';
import TypographyComponent from '@components/Typography.component';
import ChildCard from '@components/Cards/ChildCard.component'; // <--- Import du nouveau composant

// Theme
import { colors } from '@theme/colors';

// Mock Data
const CHILDREN_DATA = [
  {
    id: '1',
    prenom: 'Léo',
    classe: '6ème',
    level: 12,
    xp: 1250,
    maxXp: 2000,
    notifications: 2,
    avatar: require('@assets/images/avatars/profil_picture1.png'),
  },
  {
    id: '2',
    prenom: 'Sarah',
    classe: '4ème',
    level: 24,
    xp: 1800,
    maxXp: 2500,
    notifications: 0,
    avatar: require('@assets/images/avatars/profil_picture2.jpg'),
  },
];

const ParentDashboardScreen = () => {
  const navigation = useNavigation<any>();

  const handleChildPress = (childId: string) => {
    console.log(`Navigation vers l'enfant ${childId}`);
    // navigation.navigate('ChildDetails', { childId });
  };

  return (
    <Layout style={{ backgroundColor: colors.background }}>
      <Header
        showPoints={false}
        showStreak={false}
        showNotifications={true}
        notificationCount={2}
        showSettings={true}
        navigation={navigation}
      />

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.welcomeSection}>
          <TypographyComponent variant="h3" color={colors.text.primary}>
            Bonjour, Parents ! 👋
          </TypographyComponent>
          <TypographyComponent variant="body" color={colors.text.secondary} style={{ marginTop: 4 }}>
            Suivez les progrès de vos enfants ici.
          </TypographyComponent>
        </View>

        {/* Liste des enfants utilisant le nouveau composant */}
        <View style={styles.childrenList}>
          {CHILDREN_DATA.map((child) => (
            <ChildCard
              key={child.id}
              firstName={child.prenom}
              classe={child.classe}
              level={child.level}
              xp={child.xp}
              maxXp={child.maxXp}
              notifications={child.notifications}
              avatar={child.avatar}
              onPress={() => handleChildPress(child.id)}
              style={{ marginBottom: 16 }}
            />
          ))}
        </View>
        
        <TouchableOpacity style={styles.addChildButton}>
            <Ionicons name="add-circle-outline" size={24} color={colors.primary} />
            <TypographyComponent variant="labelLarge" color={colors.primary} style={{ marginLeft: 8 }}>
                Associer un autre enfant
            </TypographyComponent>
        </TouchableOpacity>

      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  welcomeSection: {
    marginTop: 20,
    marginBottom: 30,
  },
  childrenList: {
    marginTop: 10,
  },
  addChildButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    padding: 16,
    borderWidth: 2,
    borderColor: colors.border.light,
    borderRadius: 12,
    borderStyle: 'dashed',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});

export default ParentDashboardScreen;