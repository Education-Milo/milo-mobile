import React from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import Layout from "@shared/components/Layout";
import MainButtonComponent from "@shared/components/MainButton.component";
import TypographyComponent from "@shared/components/Typography.component";
import { useDuel } from "@features/duel/hooks/DuelContext";
import { colors } from "@shared/theme/colors";

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
  cancelButton: {
    shadowColor: colors.error,
  },
});

export default WaitingScreen;
