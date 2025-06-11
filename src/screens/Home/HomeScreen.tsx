import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from '@constants/Colors';
import Layout from '@components/Layout';
import { RootStackParamList } from '@navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface HomeScreenProps {
  navigation: NavigationProp;
}

function Home({ navigation }: HomeScreenProps) {
  return (
    <Layout navigation={navigation}>
      <View style={styles.homeContainer}>
        {/* En-tête avec logo et informations utilisateur */}
        <View style={styles.header}>
          <Image
            source={require('@assets/images/logo_sans_fond.png')}
            style={styles.smallLogo}
          />
          <View style={styles.headerRight}>
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
            <TouchableOpacity style={styles.pointsButton}>
              <Text style={styles.pointsText}>450</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Contenu principal défilable */}
        <ScrollView style={styles.scrollView}>
          {/* Section d'importation de cours mise en avant */}
          {/* <View style={styles.importSection}>
            <Text style={styles.importSectionTitle}>Ajoute un nouveau cours</Text>
            <TouchableOpacity
              style={styles.largeImportButton}
              // onPress={openCamera}
            >
              <Text style={styles.largeImportButtonText}>📸 Scanner un cours</Text>
            </TouchableOpacity>
            <Text style={styles.importDescription}>
              Prends une photo de tes notes ou d'un polycopié pour créer un nouveau cours
            </Text>
          </View> */}

          {/* Carte de série de jours */}
          <View style={styles.streakCard}>
            <View style={styles.streakIconContainer}>
              <Text style={styles.fireIcon}>🔥</Text>
            </View>
            <View>
              <Text style={styles.streakTitle}>Série en cours</Text>
              <Text style={styles.streakDays}>3 jours</Text>
            </View>
          </View>

          {/* Section des cours */}
          <View style={styles.courseSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Mes cours</Text>
            </View>

            {/* Carte de suggestion avec mascotte */}
            <View style={styles.suggestionCard}>
              <View style={styles.suggestionContent}>
                <Text style={styles.suggestionTitle}>Suggestion du jour</Text>
                <Text style={styles.suggestionText}>
                  D'après ton emploi du temps, tu as un contrôle de
                  Mathématiques jeudi. Que dirais-tu de réviser les polynômes ?
                </Text>
                <TouchableOpacity style={styles.revisionButton}>
                  <Text style={styles.revisionButtonText}>
                    Commencer la révision
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.foxContainer}>
                <Image
                  source={require('@assets/images/mascot.png')}
                  style={styles.mascotteImage}
                  resizeMode='contain'
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
}

export default Home;
