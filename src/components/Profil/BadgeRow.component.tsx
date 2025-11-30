import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import TypographyComponent from '@components/Typography.component';
import { colors } from '@theme/colors';

interface Badge {
  id: string;
  title: string;
  image: any;
  status: string;
}

interface BadgesSectionProps {
  badges: Badge[];
}

const BadgesSection = ({ badges }: BadgesSectionProps) => {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
         <TypographyComponent variant="h5">Badges du mois</TypographyComponent>
         <TouchableOpacity>
           <TypographyComponent variant="label" color={colors.primary}>TOUT VOIR</TypographyComponent>
         </TouchableOpacity>
      </View>

      <View style={styles.badgesRow}>
        {badges.map((badge) => (
          <View key={badge.id} style={styles.badgeCard}>
            <Image source={badge.image} style={styles.badgeImage} resizeMode="contain" />
            <TypographyComponent variant="labelSmall" style={{marginTop: 8, textAlign: 'center'}}>
              {badge.title}
            </TypographyComponent>
          </View>
        ))}
        <View style={[styles.badgeCard, { opacity: 0.5 }]}>
           <View style={[styles.badgeImage, { backgroundColor: '#EEE', borderRadius: 35 }]} />
           <TypographyComponent variant="labelSmall" style={{marginTop: 8}}>À venir</TypographyComponent>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
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
});

export default BadgesSection;