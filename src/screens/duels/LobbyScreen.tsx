import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import Layout from "@components/Layout";
import PendingChallengeToast from "@components/duel/PendingChallengeToast.component";
import DuelScreenFooter from "@components/duel/duelScreenFooter.component";
import DuelScreenHeader from "@components/duel/duelScreenHeader.component";
import TypographyComponent from "@components/Typography.component";
import { useDuel } from "@hooks/duel/DuelContext";
import { useDuelScreen } from "@hooks/duel/useDuelScreen";
import { colors } from "@theme/colors";

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
