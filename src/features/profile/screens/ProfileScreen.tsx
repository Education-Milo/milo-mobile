import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { colors } from "@shared/theme/colors";
import { useUserStore } from "@features/user/store/user.store";
import ProfileHeader from "@features/profile/components/Profil/ProfileHeader.component";
import StatsSection from "@features/profile/components/Profil/Statistics.component";
import BadgesSection from "@features/profile/components/Profil/BadgeRow.component";
import DuelStatsSection from "@features/profile/components/Profil/DuelStatsSection.component";

const BADGES_DU_MOIS = [
  {
    id: "1",
    title: "Défi Novembre",
    image: require("@assets/images/League/gold_league.webp"),
    status: "completed",
  },
  {
    id: "2",
    title: "Roi du Calcul",
    image: require("@assets/images/League/ruby_league.webp"),
    status: "progress",
  },
];

const ProfileScreen = () => {
  const user = useUserStore((state) => state.user);
  const stats = {
    streak: 12,
    totalXp: user?.xp || 0,
    league: "Or",
    lastCourse: "Maths - Chap 2",
  };

  const Separator = () => <View style={styles.separator} />;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <ProfileHeader user={user} />
      <Separator />
      <StatsSection stats={stats} />
      <Separator />
      <BadgesSection badges={BADGES_DU_MOIS} />
      <Separator />
      <DuelStatsSection />
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
    backgroundColor: "#E5E5E5",
    marginVertical: 4,
  },
});

export default ProfileScreen;
