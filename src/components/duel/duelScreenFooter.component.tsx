import React from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { HomeTabsParamList } from "@navigation/Auth/authNavigator.model";
import {
  type FriendPlayer,
  type RankingPlayer,
} from "@hooks/duel/useDuelScreen";
import { DuelChallenge, DuelHistoryItem } from "@store/duel/duel.model";
import ChallengeFriendSheet from "./ChallengeFriendSheet.component";
import DuelHistoryCard from "./DuelHistoryCard.component";
import DuelRankingCard from "./DuelRankingCard.component";
import PendingDuelRequests from "./PendingDuelRequests.component";

interface DuelScreenFooterProps {
  activeTab: "global" | "friends";
  onTabChange: (tab: "global" | "friends") => void;
  currentData: RankingPlayer[];
  bottomSheetRef: React.RefObject<BottomSheetModal | null>;
  onlineFriends: FriendPlayer[];
  offlineFriends: FriendPlayer[];
  pendingDuels: DuelChallenge[];
  duelHistory: DuelHistoryItem[];
  onCloseModal: () => void;
  onChallengeFriend: (player: FriendPlayer) => void;
  onAcceptPendingDuel: (duel: DuelChallenge) => void;
  onDeclinePendingDuel: (duel: DuelChallenge) => void;
  decliningDuelId?: number;
  isDecliningDuel: boolean;
}

const DuelScreenFooter = ({
  activeTab,
  onTabChange,
  currentData,
  bottomSheetRef,
  onlineFriends,
  offlineFriends,
  pendingDuels,
  duelHistory,
  onCloseModal,
  onChallengeFriend,
  onAcceptPendingDuel,
  onDeclinePendingDuel,
  decliningDuelId,
  isDecliningDuel,
}: DuelScreenFooterProps) => {
  const navigation =
    useNavigation<BottomTabNavigationProp<HomeTabsParamList>>();

  const handleGoToFriends = () => {
    onCloseModal();
    navigation.navigate("Friends");
  };

  return (
    <>
      <PendingDuelRequests
        pendingDuels={pendingDuels}
        onAcceptPendingDuel={onAcceptPendingDuel}
        onDeclinePendingDuel={onDeclinePendingDuel}
        decliningDuelId={decliningDuelId}
        isDecliningDuel={isDecliningDuel}
      />

      <DuelRankingCard
        activeTab={activeTab}
        onTabChange={onTabChange}
        currentData={currentData}
        onAddFriends={handleGoToFriends}
      />

      <DuelHistoryCard history={duelHistory} />

      <ChallengeFriendSheet
        bottomSheetRef={bottomSheetRef}
        onlineFriends={onlineFriends}
        offlineFriends={offlineFriends}
        onCloseModal={onCloseModal}
        onChallengeFriend={onChallengeFriend}
        onAddFriends={handleGoToFriends}
      />
    </>
  );
};

export default DuelScreenFooter;
