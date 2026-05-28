import React, { useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TypographyComponent from "@components/Typography.component";
import { colors } from "@theme/colors";
import { DuelHistoryItem } from "@store/duel/duel.model";

interface DuelHistoryCardProps {
  history: DuelHistoryItem[];
}

const INITIAL_VISIBLE_ITEMS = 5;
const VISIBLE_ITEMS_STEP = 5;

const outcomeConfig = {
  win: {
    icon: "trophy-outline",
    label: "Victoire",
    row: "#ECFDF3",
    border: "#86EFAC",
    badge: "#D1FAE5",
    text: colors.success,
  },
  loss: {
    icon: "skull-outline",
    label: "Défaite",
    row: "#FEF2F2",
    border: "#FECACA",
    badge: "#FEE2E2",
    text: colors.error,
  },
  draw: {
    icon: "remove-circle-outline",
    label: "Égalité",
    row: "#FFFBEB",
    border: "#FDE68A",
    badge: "#FEF3C7",
    text: "#B45309",
  },
} as const;

const formatPlayedAt = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const months = [
    "janv.",
    "févr.",
    "mars",
    "avr.",
    "mai",
    "juin",
    "juil.",
    "août",
    "sept.",
    "oct.",
    "nov.",
    "déc.",
  ];

  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

const DuelHistoryCard = ({ history }: DuelHistoryCardProps) => {
  const [visibleItems, setVisibleItems] = useState(INITIAL_VISIBLE_ITEMS);
  const sortedHistory = useMemo(
    () =>
      [...history].sort(
        (a, b) =>
          new Date(b.played_at).getTime() - new Date(a.played_at).getTime(),
      ),
    [history],
  );
  const visibleHistory = sortedHistory.slice(0, visibleItems);
  const hasMoreHistory = visibleItems < sortedHistory.length;

  const handleShowMore = () => {
    setVisibleItems((current) => current + VISIBLE_ITEMS_STEP);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="document-text-outline"
          size={24}
          color={colors.primary}
        />
        <TypographyComponent variant="h5" color={colors.text.primary}>
          Historique des parties
        </TypographyComponent>
      </View>

      {sortedHistory.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="time-outline"
            size={32}
            color={colors.text.tertiary}
          />
          <TypographyComponent
            variant="bodySmall"
            color={colors.text.secondary}
          >
            Aucune partie jouée pour le moment.
          </TypographyComponent>
        </View>
      ) : (
        <>
          {visibleHistory.map((item) => (
            <DuelHistoryRow item={item} key={item.duel_id} />
          ))}

          {hasMoreHistory && (
            <TouchableOpacity
              style={styles.showMoreButton}
              onPress={handleShowMore}
              activeOpacity={0.8}
            >
              <TypographyComponent variant="label" color={colors.primary}>
                Afficher plus
              </TypographyComponent>
              <Ionicons name="chevron-down" size={18} color={colors.primary} />
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

const DuelHistoryRow = ({ item }: { item: DuelHistoryItem }) => {
  const config = outcomeConfig[item.outcome];

  return (
    <View
      style={[
        styles.row,
        { backgroundColor: config.row, borderColor: config.border },
      ]}
    >
      <View style={styles.opponent}>
        <Ionicons name={config.icon} size={22} color={config.text} />
        <View style={styles.opponentText}>
          <TypographyComponent variant="label" color={colors.text.primary}>
            vs {item.opponent_username}
          </TypographyComponent>
          <TypographyComponent
            variant="labelSmall"
            color={colors.text.tertiary}
          >
            {formatPlayedAt(item.played_at)}
          </TypographyComponent>
        </View>
      </View>

      <View style={styles.result}>
        <TypographyComponent variant="h6" color={colors.text.primary}>
          {item.my_score}
        </TypographyComponent>
        <TypographyComponent variant="h6" color={colors.text.tertiary}>
          -
        </TypographyComponent>
        <TypographyComponent variant="h6" color={colors.text.primary}>
          {item.opponent_score}
        </TypographyComponent>
        <View style={[styles.badge, { backgroundColor: config.badge }]}>
          <TypographyComponent
            variant="labelSmall"
            style={{ color: config.text }}
          >
            {config.label}
          </TypographyComponent>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 20,
    marginTop: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 24,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 10,
    gap: 12,
  },
  opponent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  opponentText: {
    flex: 1,
  },
  result: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  badge: {
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginLeft: 6,
  },
  showMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 12,
    marginTop: 4,
  },
});

export default DuelHistoryCard;
