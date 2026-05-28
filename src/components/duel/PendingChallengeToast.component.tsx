import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TypographyComponent from "@components/Typography.component";
import { useDuel } from "@hooks/duel/DuelContext";
import { colors } from "@theme/colors";

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

const styles = StyleSheet.create({
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
  ml8: {
    marginLeft: 8,
  },
});

export default PendingChallengeToast;
