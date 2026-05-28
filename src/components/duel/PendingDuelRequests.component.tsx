import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TypographyComponent from "@components/Typography.component";
import { colors } from "@theme/colors";
import { DuelChallenge } from "@store/duel/duel.model";
import { getDuelUserName } from "./duelFooter.helpers";

interface PendingDuelRequestsProps {
  pendingDuels: DuelChallenge[];
  onAcceptPendingDuel: (duel: DuelChallenge) => void;
  onDeclinePendingDuel: (duel: DuelChallenge) => void;
  decliningDuelId?: number;
  isDecliningDuel: boolean;
}

const PendingDuelRequests = ({
  pendingDuels,
  onAcceptPendingDuel,
  onDeclinePendingDuel,
  decliningDuelId,
  isDecliningDuel,
}: PendingDuelRequestsProps) => {
  if (pendingDuels.length === 0) return null;

  return (
    <View style={styles.pendingContainer}>
      <View style={styles.pendingHeader}>
        <TypographyComponent variant="h5">Demandes de duel</TypographyComponent>
        <View style={styles.pendingBadge}>
          <TypographyComponent variant="labelSmall" color={colors.white}>
            {pendingDuels.length}
          </TypographyComponent>
        </View>
      </View>

      {pendingDuels.map((duel) => {
        const isDecliningThisDuel =
          isDecliningDuel && decliningDuelId === duel.id;

        return (
          <View style={styles.pendingDuelItem} key={duel.id}>
            <View style={styles.pendingDuelIcon}>
              <Ionicons name="flash" size={20} color={colors.secondary} />
            </View>
            <View style={styles.pendingDuelInfo}>
              <TypographyComponent variant="h6" color={colors.text.primary}>
                {getDuelUserName(duel.challenger)}
              </TypographyComponent>
              <TypographyComponent
                variant="labelSmall"
                color={colors.text.secondary}
              >
                te défie en duel
              </TypographyComponent>
            </View>
            <View style={styles.pendingDuelActions}>
              <TouchableOpacity
                style={[styles.pendingActionButton, styles.declineButton]}
                onPress={() => onDeclinePendingDuel(duel)}
                disabled={isDecliningThisDuel}
              >
                <Ionicons name="close" size={18} color={colors.error} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.pendingActionButton, styles.acceptButton]}
                onPress={() => onAcceptPendingDuel(duel)}
              >
                <Ionicons name="checkmark" size={18} color={colors.success} />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  pendingContainer: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 20,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  pendingHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  pendingBadge: {
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  pendingDuelItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  pendingDuelIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF3E0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  pendingDuelInfo: {
    flex: 1,
  },
  pendingDuelActions: {
    flexDirection: "row",
    gap: 8,
  },
  pendingActionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  declineButton: {
    borderColor: colors.error,
    backgroundColor: colors.white,
  },
  acceptButton: {
    borderColor: colors.success,
    backgroundColor: colors.white,
  },
});

export default PendingDuelRequests;
