import React from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Layout from "@components/Layout";
import TypographyComponent from "@components/Typography.component";
import MainButtonComponent from "@components/MainButton.component";
import { colors } from "@theme/colors";
import { useDuel } from "@hooks/duel/DuelContext";
import DuelScreenHeader from "@components/duel/duelScreenHeader.component";
import DuelScreenFooter from "@components/duel/duelScreenFooter.component";
import { useDuelScreen } from "@hooks/duel/useDuelScreen";

// ── Sub-screens ───────────────────────────────────────────────────────────────

const WaitingScreen = () => {
  const { waitingMessage, goToLobby } = useDuel();
  return (
    <Layout>
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
          <TypographyComponent
            variant="h3"
            style={styles.mt20}
            color={colors.primary}
          >
            ⏳ En attente...
          </TypographyComponent>
          <TypographyComponent
            variant="body"
            color={colors.text.secondary}
            style={styles.mt8}
          >
            {waitingMessage}
          </TypographyComponent>
        </View>
        <View style={styles.footer}>
          <MainButtonComponent
            title="Annuler"
            icon="close"
            onPress={goToLobby}
            style={styles.cancelButton}
          />
        </View>
      </SafeAreaView>
    </Layout>
  );
};

const GameScreen = () => {
  const { currentQuestion, answered, lastResult, myIdx, sendAnswer } =
    useDuel();

  if (!currentQuestion) return null;

  return (
    <Layout>
      <SafeAreaView style={styles.container}>
        {/* Result feedback between rounds */}
        {lastResult && (
          <View style={styles.resultBanner}>
            <Ionicons
              name={
                lastResult.my_answer === lastResult.good_answer
                  ? "checkmark-circle"
                  : "close-circle"
              }
              size={20}
              color={
                lastResult.my_answer === lastResult.good_answer
                  ? colors.success
                  : colors.error
              }
            />
            <TypographyComponent
              variant="labelSmall"
              color={
                lastResult.my_answer === lastResult.good_answer
                  ? colors.success
                  : colors.error
              }
              style={styles.ml8}
            >
              {lastResult.my_answer === lastResult.good_answer
                ? "Bonne réponse !"
                : "Mauvaise réponse"}
            </TypographyComponent>
            {/* Scores */}
            {myIdx !== null && (
              <TypographyComponent
                variant="labelSmall"
                color={colors.text.tertiary}
                style={styles.ml8}
              >
                {lastResult.scores[String(myIdx)] ?? 0} –{" "}
                {lastResult.scores[String(myIdx === 0 ? 1 : 0)] ?? 0}
              </TypographyComponent>
            )}
          </View>
        )}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.gameContent}
        >
          {/* Question number */}
          <TypographyComponent
            variant="labelSmall"
            color={colors.text.tertiary}
          >
            Question {currentQuestion.number}
          </TypographyComponent>

          {/* Question text */}
          <TypographyComponent variant="h3" style={styles.questionText}>
            {currentQuestion.question}
          </TypographyComponent>

          {/* Choices */}
          <View style={styles.choicesContainer}>
            {currentQuestion.choices.map((choice, idx) => {
              const isSelected =
                lastResult !== null
                  ? lastResult.my_answer === idx
                  : answered && false; // before result arrives, no highlight
              const isCorrect = lastResult?.good_answer === idx;
              const isWrong =
                lastResult !== null &&
                lastResult.my_answer === idx &&
                lastResult.my_answer !== lastResult.good_answer;

              return (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.choiceButton,
                    isCorrect && styles.choiceCorrect,
                    isWrong && styles.choiceWrong,
                    answered &&
                      !lastResult &&
                      isSelected &&
                      styles.choiceSelected,
                    answered && styles.choiceDisabled,
                  ]}
                  onPress={() => sendAnswer(idx)}
                  disabled={answered}
                  activeOpacity={0.7}
                >
                  <View style={styles.choiceIndex}>
                    <TypographyComponent
                      variant="labelSmall"
                      color={colors.text.tertiary}
                    >
                      {String.fromCharCode(65 + idx)}
                    </TypographyComponent>
                  </View>
                  <TypographyComponent variant="body" style={styles.choiceText}>
                    {choice}
                  </TypographyComponent>
                </TouchableOpacity>
              );
            })}
          </View>

          {answered && !lastResult && (
            <View style={styles.waitingRow}>
              <ActivityIndicator size="small" color={colors.primary} />
              <TypographyComponent
                variant="labelSmall"
                color={colors.text.tertiary}
                style={styles.ml8}
              >
                En attente de l'adversaire...
              </TypographyComponent>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
};

const EndScreen = () => {
  const { endData, myIdx, goToLobby } = useDuel();
  if (!endData) return null;

  const myScore = endData.scores[String(myIdx)] ?? 0;
  const opponentScore = endData.scores[String(myIdx === 0 ? 1 : 0)] ?? 0;
  const isDraw = endData.winner === null;
  const iWon = !isDraw && endData.winner === myIdx;

  return (
    <Layout>
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <View style={styles.resultCircle}>
            <Ionicons
              name={isDraw ? "remove" : iWon ? "trophy" : "sad-outline"}
              size={48}
              color={
                isDraw ? colors.text.secondary : iWon ? "#f59e0b" : colors.error
              }
            />
          </View>

          <TypographyComponent variant="h2" style={styles.mt20}>
            {isDraw ? "Égalité !" : iWon ? "Victoire !" : "Défaite"}
          </TypographyComponent>

          <TypographyComponent
            variant="body"
            color={colors.text.secondary}
            style={styles.mt8}
          >
            {isDraw
              ? "Personne ne l'emporte cette fois."
              : iWon
                ? "Bien joué, tu as dominé ce duel !"
                : "Pas de chance, reviens plus fort !"}
          </TypographyComponent>

          {/* Score */}
          <View style={styles.scoreCard}>
            <View style={styles.scoreBlock}>
              <TypographyComponent
                variant="labelSmall"
                color={colors.text.tertiary}
              >
                Moi
              </TypographyComponent>
              <TypographyComponent variant="h2" color={colors.primary}>
                {myScore}
              </TypographyComponent>
            </View>
            <TypographyComponent variant="h3" color={colors.text.secondary}>
              –
            </TypographyComponent>
            <View style={styles.scoreBlock}>
              <TypographyComponent
                variant="labelSmall"
                color={colors.text.tertiary}
              >
                Adversaire
              </TypographyComponent>
              <TypographyComponent variant="h2" color={colors.text.primary}>
                {opponentScore}
              </TypographyComponent>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <MainButtonComponent
            title="Retour à l'arène"
            icon="arrow-back"
            onPress={goToLobby}
          />
        </View>
      </SafeAreaView>
    </Layout>
  );
};

// ── Pending challenge modal (toast RN) ────────────────────────────────────────

const PendingChallengeToast = () => {
  const { pendingChallenge, acceptChallenge, declineChallenge } = useDuel();
  if (!pendingChallenge) return null;

  const name =
    pendingChallenge.from_first_name || pendingChallenge.from_last_name
      ? `${pendingChallenge.from_first_name ?? ""} ${pendingChallenge.from_last_name ?? ""}`.trim()
      : pendingChallenge.from_username;

  return (
    <View style={styles.toast}>
      <View style={styles.toastContent}>
        <Ionicons name="flash" size={20} color={colors.primary} />
        <TypographyComponent variant="body" style={styles.ml8}>
          <TypographyComponent variant="body" color={colors.primary}>
            {name}
          </TypographyComponent>
          {" te défie !"}
        </TypographyComponent>
      </View>
      <View style={styles.toastActions}>
        <TouchableOpacity
          style={styles.toastDecline}
          onPress={() => declineChallenge()}
        >
          <TypographyComponent variant="labelSmall" color={colors.error}>
            Refuser
          </TypographyComponent>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toastAccept}
          onPress={() => acceptChallenge()}
        >
          <TypographyComponent variant="labelSmall" color={colors.white}>
            Accepter
          </TypographyComponent>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ── Lobby ─────────────────────────────────────────────────────────────────────

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

        {/* Challenge toast flotte au-dessus du lobby */}
        <PendingChallengeToast />
      </SafeAreaView>
    </Layout>
  );
};

// ── Root switch ───────────────────────────────────────────────────────────────

const DuelScreen = () => {
  const { screen } = useDuel();

  if (screen === "waiting") return <WaitingScreen />;
  if (screen === "game") return <GameScreen />;
  if (screen === "end") return <EndScreen />;
  return <LobbyScreen />;
};

export default DuelScreen;

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  centered: { flex: 1, alignItems: "center", justifyContent: "center" },
  scrollContent: { paddingBottom: 32 },
  footer: { paddingBottom: 24 },
  mt8: { marginTop: 8 },
  mt20: { marginTop: 20 },
  ml8: { marginLeft: 8 },
  cancelButton: { shadowColor: colors.error },

  // Lobby status
  lobbyStatus: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
  },

  // Waiting
  // (nothing extra — centered covers it)

  // Game
  resultBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  gameContent: {
    paddingTop: 24,
    paddingBottom: 32,
    gap: 8,
  },
  questionText: {
    marginTop: 12,
    lineHeight: 30,
  },
  choicesContainer: {
    marginTop: 24,
    gap: 12,
  },
  choiceButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 14,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
    borderWidth: 2,
    borderColor: "transparent",
  },
  choiceSelected: {
    borderColor: colors.primary,
  },
  choiceCorrect: {
    borderColor: colors.success,
    backgroundColor: `${colors.success}15`,
  },
  choiceWrong: {
    borderColor: colors.error,
    backgroundColor: `${colors.error}15`,
  },
  choiceDisabled: {
    opacity: 0.7,
  },
  choiceIndex: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.06)",
    alignItems: "center",
    justifyContent: "center",
  },
  choiceText: { flex: 1 },
  waitingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  // End
  resultCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  scoreCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginTop: 28,
    gap: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  scoreBlock: {
    alignItems: "center",
    gap: 4,
  },

  // Toast
  toast: {
    position: "absolute",
    bottom: 32,
    left: 16,
    right: 16,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    gap: 12,
  },
  toastContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  toastActions: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "flex-end",
  },
  toastDecline: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.error,
  },
  toastAccept: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
});
