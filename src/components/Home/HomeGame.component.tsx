import React from 'react';
import { View } from 'react-native';
import TypographyComponent from '@components/Typography.component';
import Card from '@components/Card.component';

interface Mission {
  id: number;
  title: string;
  description: string;
  category: string;
  points: number;
  isCompleted: boolean;
}

interface HomeGameProps {
  dailyMissions: Mission[];
  completedMissions: number;
  totalMissions: number;
  styles: any;
  colors: any;
}

const HomeGame: React.FC<HomeGameProps> = ({
  dailyMissions,
  completedMissions,
  totalMissions,
  styles,
  colors
}) => {
  return (
    <View style={styles.missionsSection}>
      <View style={styles.missionsSectionHeader}>
        <TypographyComponent
          variant='h3'
          style={{ marginBottom: 10, textAlign: 'left' }}
          color={colors.text.title}
        >
          Missions du jour
        </TypographyComponent>
        <TypographyComponent
          variant='bodySmall'
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#FF8C00',
            backgroundColor: '#FFECE0',
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 15,
          }}
          color={colors.text.secondary}
        >
          {completedMissions}/{totalMissions}
        </TypographyComponent>
      </View>
      <View style={styles.missionsContainer}>
        {dailyMissions.map((mission) => (
          mission.isCompleted ? (
            <Card
              variant='mission'
              key={mission.id}
              title={mission.title}
              description={mission.description}
              category={mission.category}
              points={mission.points}
              isCompleted={mission.isCompleted}
              titleStyle={{ textDecorationLine: 'line-through', color: '#999' }}
            />
          ) : (
            <Card
              variant='mission'
              key={mission.id}
              title={mission.title}
              description={mission.description}
              category={mission.category}
              points={mission.points}
              isCompleted={mission.isCompleted}
              barColor='red'
              onPress={() => {
                  console.log(`Mission ${mission.id} pressed`);
              }}
            />
          )
        ))}
      </View>
    </View>
  );
};

export default HomeGame;