import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Layout from "@components/Layout";
import MainButtonComponent from "@components/MainButton.component";
import TypographyComponent from "@components/Typography.component";
import { useDuel } from "@hooks/duel/DuelContext";
import { colors } from "@theme/colors";

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
            <View style={styles.scoreSeparator}>
              <TypographyComponent variant="h3" color={colors.text.secondary}>
                –
              </TypographyComponent>
            </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    paddingBottom: 24,
  },
  mt8: {
    marginTop: 8,
  },
  mt20: {
    marginTop: 20,
  },
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
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginTop: 28,
    width: "100%",
    maxWidth: 360,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  scoreBlock: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  scoreSeparator: {
    width: 36,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default EndScreen;
