import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TypographyComponent from '@components/Typography.component';
import { colors } from '@theme/colors';

interface StatCardProps {
  icon: React.ReactNode;
  color: string;
  value: string | number;
  label: string;
  onPress?: () => void;
}

const StatCard = ({ icon, color, value, label, onPress }: StatCardProps) => (
  <TouchableOpacity style={styles.statCard} onPress={onPress} activeOpacity={0.8} disabled={!onPress}>
    <View style={[styles.statIconContainer, { borderColor: color }]}>
      {icon}
    </View>
    <View>
      <TypographyComponent variant="h6" style={{ fontSize: 15 }}>{value}</TypographyComponent>
      <TypographyComponent variant="labelSmall" color={colors.text.tertiary}>{label}</TypographyComponent>
    </View>
  </TouchableOpacity>
);

interface StatsSectionProps {
  stats: {
    streak: number;
    totalXp: number;
    league: string;
    lastCourse: string;
  };
}

const StatsSection = ({ stats }: StatsSectionProps) => {
  return (
    <View style={styles.section}>
      <TypographyComponent variant="h5" style={styles.sectionTitle}>Récapitulatif</TypographyComponent>
      <View style={styles.statsGrid}>
        <StatCard
          icon={<Ionicons name="flame" size={20} color="#FF9600" />}
          color="#FF9600"
          value={stats.streak}
          label="Jours streak"
        />
        <StatCard
          icon={<Ionicons name="flash" size={20} color="#FFD700" />}
          color="#FFD700"
          value={stats.totalXp}
          label="Total XP"
        />
        <StatCard
          icon={<Ionicons name="trophy" size={20} color="#1CB0F6" />}
          color="#1CB0F6"
          value={stats.league}
          label="Division"
        />
        <StatCard
          icon={<Ionicons name="book" size={20} color="#2B70C9" />}
          color="#2B70C9"
          value="Reprendre"
          label={stats.lastCourse}
          onPress={() => console.log("Reprendre cours")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    padding: 20,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%', 
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
});

export default StatsSection;