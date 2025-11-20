import React from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { 
  Settings, 
  UserPlus, 
  Flame, 
  Zap, 
  Trophy, 
  BookOpen, 
  ChevronRight 
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Imports internes
import Layout from '@components/Layout';
import TypographyComponent from '@components/Typography.component';
import { colors } from '@theme/colors';
import { useUserStore } from '@store/user/user.store';

// --- Mock Data pour l'exemple (à remplacer par vos vraies données) ---
const BADGES_DU_MOIS = [
  { id: '1', title: 'Défi Novembre', image: require('@assets/images/League/gold_league.webp'), status: 'completed' },
  { id: '2', title: 'Roi du Calcul', image: require('@assets/images/League/ruby_league.webp'), status: 'progress' },
];

const SUCCES_RECENTS = [
  { id: '1', title: 'Lève-tôt', desc: 'Terminer une leçon avant 8h', icon: 'sun', progress: 3, total: 3 },
  { id: '2', title: 'Erudit', desc: 'Apprendre 50 nouveaux mots', icon: 'book', progress: 42, total: 50 },
  { id: '3', title: 'Imbattable', desc: '10 leçons sans faute', icon: 'target', progress: 7, total: 10 },
];

const ProfileScreen = () => {
  const navigation = useNavigation();
  const user = useUserStore((state) => state.user);

  // Données utilisateur fictives si non connectées au store complet
  const stats = {
    streak: 12,
    totalXp: 2450,
    league: 'Or',
    lastCourse: 'Maths - Chap 2',
  };

  // --- Composants internes pour la lisibilité ---

  const StatCard = ({ icon: Icon, color, value, label, onPress }: any) => (
    <TouchableOpacity style={styles.statCard} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.statIconContainer, { borderColor: color }]}>
        <Icon size={20} color={color} fill={color} />
      </View>
      <View>
        <TypographyComponent variant="h6" style={{fontSize: 15}}>{value}</TypographyComponent>
        <TypographyComponent variant="labelSmall" color={colors.text.tertiary}>{label}</TypographyComponent>
      </View>
    </TouchableOpacity>
  );

  const AchievementRow = ({ title, desc, progress, total }: any) => {
    const isCompleted = progress >= total;
    const percent = (progress / total) * 100;

    return (
      <View style={styles.achievementRow}>
        <View style={[styles.achievementIcon, isCompleted ? styles.achievementCompleted : null]}>
          <Trophy size={24} color={isCompleted ? '#FFD700' : '#CCC'} />
        </View>
        <View style={styles.achievementContent}>
          <TypographyComponent variant="h6">{title}</TypographyComponent>
          <TypographyComponent variant="labelSmall" color={colors.text.secondary} style={{marginBottom: 6}}>
            {desc}
          </TypographyComponent>

          {/* Barre de progression */}
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${percent}%` }]} />
          </View>
          <View style={{flexDirection:'row', justifyContent: 'flex-end', marginTop: 2}}>
             <TypographyComponent variant="labelSmall" color={colors.text.tertiary}>
               {progress} / {total}
             </TypographyComponent>
          </View>
        </View>
      </View>
    );
  };

  return (
      <ScrollView
        style={styles.container} 
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* --- Header & Profil --- */}
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
                <TypographyComponent variant="h6" style={{fontSize: 12}}>🇫🇷</TypographyComponent>
              </View>
            </View>
            
            <TypographyComponent variant="h3" style={{marginTop: 12}}>
              {user?.prenom} {user?.nom}
            </TypographyComponent>
            <TypographyComponent variant="body" color={colors.text.tertiary}>
              Élève motivé • A rejoint en 2024
            </TypographyComponent>
            <TouchableOpacity style={styles.addFriendButton} activeOpacity={0.8}>
              <TypographyComponent variant="button" color="#FFF">
                Modfier le profil
              </TypographyComponent>
            </TouchableOpacity>

          </View>
        </View>

        <View style={styles.separator} />

        {/* --- Section 1: Statistiques (Récap) --- */}
        <View style={styles.section}>
          <TypographyComponent variant="h5" style={styles.sectionTitle}>Récapitulatif</TypographyComponent>
          
          <View style={styles.statsGrid}>
            <StatCard 
              icon={Flame} 
              color="#FF9600" 
              value={stats.streak} 
              label="Jours streak" 
            />
            <StatCard 
              icon={Zap} 
              color="#FFD700" 
              value={stats.totalXp} 
              label="Total XP" 
            />
            <StatCard 
              icon={Trophy} 
              color="#1CB0F6" 
              value={stats.league} 
              label="Division" 
            />
            <StatCard 
              icon={BookOpen} 
              color="#2B70C9" 
              value="Reprendre" 
              label={stats.lastCourse} 
              onPress={() => console.log("Reprendre cours")}
            />
          </View>
        </View>

        <View style={styles.separator} />

        {/* --- Section 2: Badges du mois --- */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
             <TypographyComponent variant="h5">Badges du mois</TypographyComponent>
             <TouchableOpacity>
               <TypographyComponent variant="label" color={colors.primary}>TOUT VOIR</TypographyComponent>
             </TouchableOpacity>
          </View>

          <View style={styles.badgesRow}>
            {BADGES_DU_MOIS.map((badge) => (
              <View key={badge.id} style={styles.badgeCard}>
                <Image source={badge.image} style={styles.badgeImage} resizeMode="contain" />
                <TypographyComponent variant="labelSmall" style={{marginTop: 8, textAlign: 'center'}}>
                  {badge.title}
                </TypographyComponent>
              </View>
            ))}
            {/* Placeholder pour badges grisés */}
            <View style={[styles.badgeCard, { opacity: 0.5 }]}>
               <View style={[styles.badgeImage, { backgroundColor: '#EEE', borderRadius: 35 }]} />
               <TypographyComponent variant="labelSmall" style={{marginTop: 8}}>À venir</TypographyComponent>
            </View>
          </View>
        </View>

        <View style={styles.separator} />

        {/* --- Section 3: Succès --- */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
             <TypographyComponent variant="h5">Succès</TypographyComponent>
             <TouchableOpacity>
               <TypographyComponent variant="label" color={colors.primary}>TOUT VOIR</TypographyComponent>
             </TouchableOpacity>
          </View>

          <View style={styles.achievementsList}>
            {SUCCES_RECENTS.map((succes) => (
              <AchievementRow key={succes.id} {...succes} />
            ))}
          </View>
        </View>

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
  // Header
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
    borderColor: '#E5E5E5', // Ou pointillé
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

  // Sections Communes
  section: {
    padding: 20,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  // Grid Stats
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%', // 2 par ligne
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFF',
  },
  statIconContainer: {
    marginRight: 10,
  },

  // Badges
  badgesRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 16,
  },
  badgeCard: {
    width: 80,
    alignItems: 'center',
  },
  badgeImage: {
    width: 70,
    height: 70,
  },

  // Succès (Achievements)
  achievementsList: {
    gap: 16,
  },
  achievementRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  achievementCompleted: {
    backgroundColor: '#FFFBE6', // Jaune très pâle
  },
  achievementContent: {
    flex: 1,
    paddingVertical: 4,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    width: '100%',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 4,
  },
});

export default ProfileScreen;