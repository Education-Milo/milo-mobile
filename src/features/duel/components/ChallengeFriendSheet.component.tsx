import React from "react";
import { SectionList, StyleSheet, TouchableOpacity, View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import BottomSheetComponent from "@shared/components/BottomSheetModal.component";
import EmptyFriendComponent from "@shared/components/EmptyFriend.component";
import TypographyComponent from "@shared/components/Typography.component";
import { colors } from "@shared/theme/colors";
import { FriendPlayer } from "@features/duel/hooks/useDuelScreen";
import DuelAvatar from "./DuelAvatar.component";

interface ChallengeFriendSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetModal | null>;
  onlineFriends: FriendPlayer[];
  offlineFriends: FriendPlayer[];
  onCloseModal: () => void;
  onChallengeFriend: (player: FriendPlayer) => void;
  onAddFriends: () => void;
}

const ChallengeFriendSheet = ({
  bottomSheetRef,
  onlineFriends,
  offlineFriends,
  onCloseModal,
  onChallengeFriend,
  onAddFriends,
}: ChallengeFriendSheetProps) => {
  const hasFriends = onlineFriends.length + offlineFriends.length > 0;

  return (
    <BottomSheetComponent ref={bottomSheetRef} snapPoints={["55%"]}>
      <View style={styles.modalHeader}>
        <TypographyComponent variant="h5">Défier un ami</TypographyComponent>
        <TouchableOpacity onPress={onCloseModal}>
          <Ionicons name="close" size={24} color={colors.text.secondary} />
        </TouchableOpacity>
      </View>
      <TypographyComponent
        variant="bodySmall"
        color={colors.text.secondary}
        style={styles.modalSubtitle}
      >
        Choisis un ami à défier
      </TypographyComponent>
      {hasFriends ? (
        <SectionList
          sections={[
            { title: "En ligne", data: onlineFriends },
            { title: "Hors ligne", data: offlineFriends },
          ]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FriendChallengeItem
              item={item}
              onChallengeFriend={onChallengeFriend}
            />
          )}
          renderSectionHeader={({ section }) =>
            section.data.length > 0 ? (
              <View style={styles.friendSectionHeader}>
                <TypographyComponent
                  variant="label"
                  color={colors.text.secondary}
                >
                  {section.title}
                </TypographyComponent>
                <View style={styles.friendSectionBadge}>
                  <TypographyComponent
                    variant="labelSmall"
                    color={colors.text.tertiary}
                  >
                    {section.data.length}
                  </TypographyComponent>
                </View>
              </View>
            ) : null
          }
          stickySectionHeadersEnabled={false}
        />
      ) : (
        <EmptyFriendComponent onAddFriends={onAddFriends} />
      )}
    </BottomSheetComponent>
  );
};

interface FriendChallengeItemProps {
  item: FriendPlayer;
  onChallengeFriend: (player: FriendPlayer) => void;
}

const FriendChallengeItem = ({
  item,
  onChallengeFriend,
}: FriendChallengeItemProps) => {
  const isOffline = !item.isOnline;

  return (
    <View style={[styles.friendItem, isOffline && styles.friendItemOffline]}>
      <View style={styles.friendInfo}>
        <View>
          <DuelAvatar name={item.name} avatar={item.avatar} size="small" />
          <View style={[styles.statusDot, isOffline && styles.offlineDot]} />
        </View>
        <View style={styles.friendText}>
          <TypographyComponent
            variant="body"
            color={isOffline ? colors.text.secondary : colors.text.primary}
          >
            {item.name}
          </TypographyComponent>
          <TypographyComponent
            variant="labelSmall"
            color={isOffline ? colors.text.tertiary : colors.success}
          >
            {isOffline ? "Hors ligne" : "En ligne"}
          </TypographyComponent>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.challengeButton,
          isOffline && styles.challengeButtonDisabled,
        ]}
        onPress={() => onChallengeFriend(item)}
        disabled={isOffline}
      >
        <TypographyComponent
          variant="label"
          style={[
            styles.challengeButtonText,
            isOffline && styles.challengeButtonTextDisabled,
          ]}
        >
          {isOffline ? "Indispo." : "Défier"}
        </TypographyComponent>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  modalSubtitle: {
    marginBottom: 16,
  },
  friendItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    // borderBottomWidth: 1,
    // borderBottomColor: colors.border.light,
  },
  friendItemOffline: {
    opacity: 0.75,
  },
  friendInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  friendText: {
    flex: 1,
    marginLeft: 12,
  },
  statusDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.success,
    borderWidth: 1.5,
    borderColor: colors.background,
  },
  offlineDot: {
    backgroundColor: colors.text.tertiary,
  },
  challengeButton: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  challengeButtonDisabled: {
    backgroundColor: colors.border.medium,
  },
  challengeButtonText: {
    color: colors.white,
  },
  challengeButtonTextDisabled: {
    color: colors.text.secondary,
  },
  friendSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.primaryLight,
    paddingTop: 10,
    paddingBottom: 6,
    borderRadius: 20,
    paddingHorizontal: 12,
  },
  friendSectionBadge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.border.medium,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
});

export default ChallengeFriendSheet;
