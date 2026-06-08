import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import Layout from "@shared/components/Layout";
import PendingChallengeToast from "@features/duel/components/PendingChallengeToast.component";
import DuelScreenFooter from "@features/duel/components/duelScreenFooter.component";
import DuelScreenHeader from "@features/duel/components/duelScreenHeader.component";
import TypographyComponent from "@shared/components/Typography.component";
import { useDuel } from "@features/duel/hooks/DuelContext";
import { useDuelScreen } from "@features/duel/hooks/useDuelScreen";
import { colors } from "@shared/theme/colors";

const LobbyScreen = () => {
  const {
    activeTab,
    setActiveTab,
    bottomSheetRef,
    currentData,
    onlineFriends,
    offlineFriends,
    pendingDuels,
    duelHistory,
    handleRandomMatch,
    handleChallengeFriend,
    handleAcceptPendingDuel,
    handleDeclinePendingDuel,
    decliningDuelId,
    isDecliningDuel,
    openChallengeModal,
    closeChallengeModal,
  } = useDuelScreen();

  const { lobbyStatus } = useDuel();

  return (
    <Layout>
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {lobbyStatus ? (
            <View style={styles.lobbyStatus}>
              <TypographyComponent variant="body" color={colors.text.secondary}>
                {lobbyStatus}
              </TypographyComponent>
            </View>
          ) : null}

          <DuelScreenHeader
            onRandomMatch={handleRandomMatch}
            onChallengeModal={openChallengeModal}
          />
          <DuelScreenFooter
            activeTab={activeTab}
            onTabChange={setActiveTab}
            currentData={currentData}
            bottomSheetRef={bottomSheetRef}
            onlineFriends={onlineFriends}
            offlineFriends={offlineFriends}
            pendingDuels={pendingDuels}
            duelHistory={duelHistory}
            onCloseModal={closeChallengeModal}
            onChallengeFriend={handleChallengeFriend}
            onAcceptPendingDuel={handleAcceptPendingDuel}
            onDeclinePendingDuel={handleDeclinePendingDuel}
            decliningDuelId={decliningDuelId}
            isDecliningDuel={isDecliningDuel}
          />
        </ScrollView>

        <PendingChallengeToast />
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  lobbyStatus: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
  },
});

export default LobbyScreen;
