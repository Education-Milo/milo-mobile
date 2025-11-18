import { useState, useMemo } from 'react';
import { useUserStore } from '@store/user/user.store';

export interface DailyMission {
  id: string;
  icon: string;
  title: string;
  progressCurrent: number;
  progressTotal: number;
  rewardPoints: number;
}

export interface MonthlyBadge {
  id: string;
  month: string;
  status: 'earned' | 'missed' | 'locked';
  imageUrl?: string;
}

export interface MonthlyChallenge {
  title: string;
  questsCurrent: number;
  questsTotal: number;
  daysLeft: number;
}

export const useMissionsScreen = () => {
  const user = useUserStore(state => state.user);

  // Mock data - À remplacer par vos vraies données API
  const [dailyMissions] = useState<DailyMission[]>([
    {
      id: '1',
      icon: '📖',
      title: 'Terminer 3 leçons',
      progressCurrent: 2,
      progressTotal: 3,
      rewardPoints: 50
    },
    {
      id: '2',
      icon: '🎯',
      title: 'Obtenir 90% de précision',
      progressCurrent: 0,
      progressTotal: 1,
      rewardPoints: 30
    },
    {
      id: '3',
      icon: '⚡',
      title: 'Série de 5 jours',
      progressCurrent: 3,
      progressTotal: 5,
      rewardPoints: 100
    }
  ]);

  const [monthlyChallenge] = useState<MonthlyChallenge>({
    title: 'Défi Mensuel',
    questsCurrent: 12,
    questsTotal: 20,
    daysLeft: 15
  });

  const [badgesByYear] = useState<Record<number, MonthlyBadge[]>>({
    2025: [
      { id: '1', month: 'Jan', status: 'earned' },
      { id: '2', month: 'Fév', status: 'earned' },
      { id: '3', month: 'Mar', status: 'missed' },
      { id: '4', month: 'Avr', status: 'locked' },
      { id: '5', month: 'Mai', status: 'locked' },
      { id: '6', month: 'Juin', status: 'locked' },
      { id: '7', month: 'Juil', status: 'locked' },
      { id: '8', month: 'Août', status: 'locked' },
      { id: '9', month: 'Sep', status: 'locked' },
      { id: '10', month: 'Oct', status: 'locked' },
      { id: '11', month: 'Nov', status: 'locked' },
      { id: '12', month: 'Déc', status: 'locked' }
    ]
  });

  const sortedYears = useMemo(
    () => Object.keys(badgesByYear).map(Number).sort((a, b) => b - a),
    [badgesByYear]
  );

  return {
    user,
    dailyMissions,
    monthlyChallenge,
    badgesByYear,
    sortedYears
  };
};