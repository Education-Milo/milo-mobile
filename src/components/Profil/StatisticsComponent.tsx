import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

// Interface pour les statistiques
interface Statistics {
  streak: number;
  level: string;
  totalXP: number;
  weeklyXP: number;
  currentLevel: number;
  nextLevel: number;
  xpToNextLevel: number;
  weeklyProgress: { day: string; value: number }[];
}

interface StatisticsComponentProps {
  onRefresh?: () => void;
}

const StatisticsComponent: React.FC<StatisticsComponentProps> = ({
  onRefresh,
}) => {
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Charger les statistiques au montage du composant
  useEffect(() => {
    loadStatistics();
  }, []);

  // Fonction pour charger les statistiques depuis l'API
  const loadStatistics = async () => {
    setIsLoading(true);
    try {
      console.log('Chargement des statistiques...');
      // APIAxios.get(APIRoutes.GETStatistics(), {
      //   headers: {
      //     // 'Authorization': `Bearer ${token}`,
      //   },
      // })

      // Pour la démonstration, utiliser des données fictives
      setTimeout(() => {
        setStatistics({
          streak: 12,
          level: 'Bronze',
          totalXP: 2450,
          weeklyXP: 350,
          currentLevel: 8,
          nextLevel: 9,
          xpToNextLevel: 350,
          weeklyProgress: [
            { day: 'L', value: 40 },
            { day: 'M', value: 50 },
            { day: 'M', value: 70 },
            { day: 'J', value: 30 },
            { day: 'V', value: 80 },
            { day: 'S', value: 60 },
            { day: 'D', value: 100 },
          ],
        });
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
      setIsLoading(false);
    }
  };

  // Fonction pour rafraîchir les statistiques
  const handleRefresh = async () => {
    await loadStatistics();
    onRefresh?.();
  };

  if (isLoading || !statistics) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 16, color: '#666' }}>
          Chargement des statistiques...
        </Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      {/* Section badges */}
      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
          marginBottom: 30,
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <View
            style={{
              backgroundColor: '#FFF5E6',
              borderRadius: 50,
              padding: 15,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 20, color: '#FF8C00' }}>🔥</Text>
          </View>
          <Text style={{ fontWeight: 'bold' }}>{statistics.streak} jours</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <View
            style={{
              backgroundColor: '#FFF5E6',
              borderRadius: 50,
              padding: 15,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 20, color: '#FF8C00' }}>🏆</Text>
          </View>
          <Text style={{ fontWeight: 'bold' }}>{statistics.level}</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <View
            style={{
              backgroundColor: '#FFF5E6',
              borderRadius: 50,
              padding: 15,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 20, color: '#FF8C00' }}>⚡</Text>
          </View>
          <Text style={{ fontWeight: 'bold' }}>{statistics.totalXP} XP</Text>
        </View>
      </View> */}

      {/* Série card */}
      <View
        style={{
          backgroundColor: '#FFF',
          borderRadius: 15,
          padding: 20,
          marginBottom: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 3,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 15,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                backgroundColor: '#FFF5E6',
                borderRadius: 50,
                padding: 10,
                marginRight: 10,
              }}
            >
              <Text style={{ fontSize: 16 }}>🔥</Text>
            </View>
          </View>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Ta Série</Text>
        </View>

        <Text
          style={{
            fontSize: 42,
            fontWeight: 'bold',
            color: '#FF8C00',
            marginBottom: 15,
          }}
        >
          {statistics.streak}{' '}
          <Text style={{ fontSize: 16, color: '#666' }}>jours</Text>
        </Text>

        {/* Bar chart */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            height: 100,
          }}
        >
          {statistics.weeklyProgress.map((day, index) => {
            const colors = [
              '#FFC266',
              '#FFC266',
              '#FFAA33',
              '#FF8C00',
              '#FFAA33',
              '#FFC266',
              '#7FFF00',
            ];
            return (
              <View key={index} style={{ alignItems: 'center' }}>
                <View
                  style={{
                    height: day.value,
                    width: 30,
                    backgroundColor: colors[index],
                    borderRadius: 5,
                  }}
                ></View>
                <Text style={{ marginTop: 5, color: '#666' }}>{day.day}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Points XP card */}
      <View
        style={{
          backgroundColor: '#FFF',
          borderRadius: 15,
          padding: 20,
          marginBottom: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 3,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 15,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                backgroundColor: '#FFF',
                borderRadius: 50,
                padding: 10,
                marginRight: 10,
              }}
            >
              <Text style={{ fontSize: 16 }}>⚡</Text>
            </View>
          </View>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            Tes Points XP
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}
        >
          <View>
            <Text
              style={{ fontSize: 42, fontWeight: 'bold', color: '#8A2BE2' }}
            >
              {statistics.weeklyXP}
            </Text>
            <Text style={{ fontSize: 14, color: '#666' }}>Cette semaine</Text>
          </View>
          <View>
            <Text
              style={{ fontSize: 42, fontWeight: 'bold', color: '#FF8C00' }}
            >
              {statistics.totalXP}
            </Text>
            <Text style={{ fontSize: 14, color: '#666' }}>Au total</Text>
          </View>
        </View>

        {/* Niveau progress */}
        <View style={{ marginBottom: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 5,
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>
              Niveau {statistics.currentLevel}
            </Text>
            <Text style={{ fontWeight: 'bold' }}>
              Niveau {statistics.nextLevel}
            </Text>
          </View>
          <View
            style={{ height: 10, backgroundColor: '#E0E0E0', borderRadius: 5 }}
          >
            <View
              style={{
                height: 10,
                width: '65%',
                backgroundColor: '#8A2BE2',
                borderRadius: 5,
              }}
            ></View>
          </View>
          <Text style={{ fontSize: 12, color: '#666', marginTop: 5 }}>
            {statistics.xpToNextLevel} XP restants
          </Text>
        </View>
      </View>
    </View>
  );
};

export default StatisticsComponent;
