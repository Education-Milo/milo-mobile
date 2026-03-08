import TypographyComponent from '@components/Typography.component';
import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import MissionRow from '@components/missions/MissionRow.component';
import { useMissionsScreen } from '@hooks/useMissionsScreen';
import { colors } from '@theme/colors';

const MissionsScreen = () => {
  const { tabs, activeTab, setActiveTab, missions } = useMissionsScreen();

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View entering={FadeInDown.duration(500)} style={styles.header}>
          <View style={styles.headerTextBlock}>
            <TypographyComponent variant="h1">Missions</TypographyComponent>
          </View>
          <Image
            source={require('@assets/images/Milo_cours.png')}
            style={styles.mascot}
          />
        </Animated.View>

        {/* Tab Switcher */}
        <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, activeTab === tab.id && styles.tabActive]}
              onPress={() => setActiveTab(tab.id)}
              activeOpacity={0.75}
            >
              <TypographyComponent
                variant="labelSmall"
                style={[styles.tabText, activeTab === tab.id && styles.tabTextActive]}
              >
                {tab.label}
              </TypographyComponent>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Mission List */}
        <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.missionsList}>
          {missions.map((mission, index) => (
            <MissionRow key={mission.id} mission={mission} index={index} />
          ))}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },

  // ── Header ──
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 4,
    overflow: 'visible',
  },
  headerTextBlock: {
    flex: 1,
    paddingBottom: 12,
  },
  mascot: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: -10,
  },

  // ── Tabs ──
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    marginTop: 16,
    marginBottom: 24,
    backgroundColor: colors.primaryLight,
    borderRadius: 30,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 26,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  tabText: {
    color: colors.text.tertiary,
    fontWeight: '600',
  },
  tabTextActive: {
    color: colors.text.white,
  },

  // ── Missions List ──
  missionsList: {
    paddingHorizontal: 16,
    gap: 12,
  },
});

export default MissionsScreen;