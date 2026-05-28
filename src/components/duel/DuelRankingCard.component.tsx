import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TypographyComponent from "@components/Typography.component";
import EmptyFriendComponent from "@components/EmptyFriend.component";
import { colors } from "@theme/colors";
import { RankingPlayer } from "@hooks/duel/useDuelScreen";
import DuelAvatar from "./DuelAvatar.component";

interface DuelRankingCardProps {
  activeTab: "global" | "friends";
  onTabChange: (tab: "global" | "friends") => void;
  currentData: RankingPlayer[];
  onAddFriends: () => void;
}

const DuelRankingCard = ({
  activeTab,
  onTabChange,
  currentData,
  onAddFriends,
}: DuelRankingCardProps) => (
  <View style={styles.rankingContainer}>
    <View style={styles.rankingHeader}>
      <TypographyComponent variant="h5">Classement</TypographyComponent>
      <View style={styles.toggleContainer}>
        <RankingTab
          icon="globe-outline"
          label="Global"
          isActive={activeTab === "global"}
          onPress={() => onTabChange("global")}
        />
        <RankingTab
          icon="people-outline"
          label="Amis"
          isActive={activeTab === "friends"}
          onPress={() => onTabChange("friends")}
        />
      </View>
    </View>

    {activeTab === "global" ? (
      <View style={styles.comingSoonContainer}>
        <Ionicons
          name="podium-outline"
          size={36}
          color={colors.text.tertiary}
        />
        <TypographyComponent variant="h6" style={styles.comingSoonTitle}>
          Classement bientôt disponible
        </TypographyComponent>
        <TypographyComponent
          variant="bodySmall"
          color={colors.text.secondary}
          style={styles.comingSoonText}
        >
          Le classement global des duels sera affiché ici plus tard.
        </TypographyComponent>
      </View>
    ) : currentData.length === 0 ? (
      <EmptyFriendComponent onAddFriends={onAddFriends} />
    ) : (
      currentData.map((item) => <RankingItem item={item} key={item.id} />)
    )}
  </View>
);

interface RankingTabProps {
  icon: "globe-outline" | "people-outline";
  label: string;
  isActive: boolean;
  onPress: () => void;
}

const RankingTab = ({ icon, label, isActive, onPress }: RankingTabProps) => (
  <TouchableOpacity
    style={[styles.toggleButton, isActive && styles.toggleActive]}
    onPress={onPress}
  >
    <Ionicons
      name={icon}
      size={14}
      color={isActive ? colors.white : colors.text.secondary}
    />
    <TypographyComponent
      variant="labelSmall"
      style={[styles.toggleText, isActive && styles.toggleTextActive]}
    >
      {label}
    </TypographyComponent>
  </TouchableOpacity>
);

const RankingItem = ({ item }: { item: RankingPlayer }) => {
  const isMe = item.name === "Vous";

  return (
    <View style={[styles.rankItem, isMe && styles.rankItemActive]}>
      <View style={styles.rankNumberContainer}>
        {item.rank <= 3 ? (
          <Ionicons
            name={item.rank === 1 ? "trophy" : "trophy-outline"}
            size={20}
            color={
              item.rank === 1
                ? "#FFD700"
                : item.rank === 2
                  ? "#C0C0C0"
                  : "#CD7F32"
            }
          />
        ) : (
          <TypographyComponent variant="h6" color={colors.text.secondary}>
            {item.rank}
          </TypographyComponent>
        )}
      </View>
      <DuelAvatar name={item.name} avatar={item.avatar} />
      <View style={styles.rankInfo}>
        <TypographyComponent
          variant="h6"
          color={isMe ? colors.primary : colors.text.primary}
        >
          {item.name}
        </TypographyComponent>
        <TypographyComponent variant="labelSmall" color={colors.text.tertiary}>
          {item.score !== undefined ? `${item.score} XP` : "Ami"}
        </TypographyComponent>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rankingContainer: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  rankingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: colors.primaryLight,
    borderRadius: 20,
    padding: 4,
  },
  toggleButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    gap: 4,
  },
  toggleActive: {
    backgroundColor: colors.primary,
  },
  toggleText: {
    color: colors.text.secondary,
  },
  toggleTextActive: {
    color: colors.white,
  },
  rankItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  rankItemActive: {
    backgroundColor: "#FFF3E0",
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  rankNumberContainer: {
    width: 30,
    alignItems: "center",
    marginRight: 12,
  },
  rankInfo: {
    flex: 1,
  },
  comingSoonContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 28,
    paddingHorizontal: 12,
  },
  comingSoonTitle: {
    marginTop: 12,
    marginBottom: 6,
    textAlign: "center",
  },
  comingSoonText: {
    textAlign: "center",
    lineHeight: 20,
  },
});

export default DuelRankingCard;
