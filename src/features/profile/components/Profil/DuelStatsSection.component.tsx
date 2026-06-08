import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TypographyComponent from "@shared/components/Typography.component";
import { useDuelStats } from "@features/duel/api/duel.queries";
import { colors } from "@shared/theme/colors";

const StatTile = ({
  icon,
  value,
  label,
  backgroundColor,
  borderColor,
}: {
  icon: string;
  value: number;
  label: string;
  backgroundColor: string;
  borderColor: string;
}) => (
  <View style={[styles.statTile, { backgroundColor, borderColor }]}>
    <TypographyComponent variant="h6" style={styles.statIcon}>
      {icon}
    </TypographyComponent>
    <TypographyComponent variant="h3" color={colors.text.primary}>
      {value}
    </TypographyComponent>
    <TypographyComponent variant="labelSmall" color={colors.text.secondary}>
      {label}
    </TypographyComponent>
  </View>
);

const DuelStatsSection = () => {
  const { data: stats, isLoading } = useDuelStats();
  const wins = stats?.wins ?? 0;
  const draws = stats?.draws ?? 0;
  const losses = stats?.losses ?? 0;
  const total = stats?.total_games ?? wins + draws + losses;
  const winrate = stats?.winrate ?? 0;
  const avgScore = stats?.avg_score ?? 0;
  const opponents = stats?.per_opponent ?? [];

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Ionicons name="stats-chart-outline" size={24} color={colors.primary} />
        <TypographyComponent variant="h5" color={colors.text.primary}>
          Mes Statistiques
        </TypographyComponent>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      ) : (
        <>
          <View style={styles.statsGrid}>
            <StatTile
              icon="🏆"
              value={wins}
              label="Victoires"
              backgroundColor="#ECFDF3"
              borderColor="#86EFAC"
            />
            <StatTile
              icon="🤝"
              value={draws}
              label="Égalités"
              backgroundColor="#FFFBEB"
              borderColor="#FDE68A"
            />
            <StatTile
              icon="💀"
              value={losses}
              label="Défaites"
              backgroundColor="#FEF2F2"
              borderColor="#FECACA"
            />
            <StatTile
              icon="⚔️"
              value={total}
              label="Total"
              backgroundColor="#F8FAFC"
              borderColor="#E2E8F0"
            />
          </View>

          <View style={styles.summaryGrid}>
            <View style={styles.summaryPanel}>
              <View style={styles.winrateHeader}>
                <TypographyComponent
                  variant="label"
                  color={colors.text.secondary}
                >
                  Taux de victoire
                </TypographyComponent>
                <TypographyComponent variant="h4" color={colors.secondary} style={{ textAlign: 'center' }}>
                  {winrate}%
                </TypographyComponent>
              </View>
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${Math.min(Math.max(winrate, 0), 100)}%` },
                  ]}
                />
              </View>
            </View>

            <View style={styles.summaryPanel}>
              <TypographyComponent
                variant="label"
                color={colors.text.secondary}
              >
                Score moyen
              </TypographyComponent>
              <TypographyComponent variant="h4" color={colors.text.primary}>
                {avgScore.toFixed(2)}
                <TypographyComponent
                  variant="labelSmall"
                  color={colors.text.tertiary}
                >
                  {" "}
                  / 5
                </TypographyComponent>
              </TypographyComponent>
            </View>
          </View>

          {opponents.length > 0 && (
            <>
              <View style={styles.divider} />
              <TypographyComponent
                variant="label"
                color={colors.text.secondary}
                style={styles.faceToFaceTitle}
              >
                Face à face
              </TypographyComponent>

              <View style={styles.opponentsList}>
                {opponents.map((opponent) => (
                  <View style={styles.opponentRow} key={opponent.opponent_id}>
                    <TypographyComponent
                      variant="label"
                      color={colors.text.primary}
                      style={styles.opponentName}
                    >
                      {opponent.opponent_username}
                    </TypographyComponent>
                    <View style={styles.opponentStats}>
                      <TypographyComponent
                        variant="labelSmall"
                        style={styles.winText}
                      >
                        {opponent.wins}V
                      </TypographyComponent>
                      <TypographyComponent
                        variant="labelSmall"
                        style={styles.drawText}
                      >
                        {opponent.draws}N
                      </TypographyComponent>
                      <TypographyComponent
                        variant="labelSmall"
                        style={styles.lossText}
                      >
                        {opponent.losses}D
                      </TypographyComponent>
                      <TypographyComponent
                        variant="labelSmall"
                        style={styles.rateText}
                      >
                        {opponent.winrate}%
                      </TypographyComponent>
                    </View>
                  </View>
                ))}
              </View>
            </>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 18,
  },
  loadingContainer: {
    alignItems: "center",
    paddingVertical: 28,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },
  statTile: {
    width: "48%",
    borderWidth: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },
  statIcon: {
    marginBottom: 2,
  },
  summaryGrid: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  summaryPanel: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border.medium,
    padding: 14,
    justifyContent: "center",
  },
  winrateHeader: {
    marginBottom: 8,
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#F1F5F9",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
    backgroundColor: colors.secondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.medium,
    marginVertical: 18,
  },
  faceToFaceTitle: {
    marginBottom: 12,
  },
  opponentsList: {
    gap: 8,
  },
  opponentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 10,
  },
  opponentName: {
    flex: 1,
  },
  opponentStats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  winText: {
    color: colors.success,
  },
  drawText: {
    color: "#B45309",
  },
  lossText: {
    color: colors.error,
  },
  rateText: {
    color: colors.secondary,
    marginLeft: 6,
  },
});

export default DuelStatsSection;
