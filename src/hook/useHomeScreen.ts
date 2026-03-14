import { useEffect, useMemo, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@navigation/Auth/authNavigator.model';
import { fakeRecentCourses, fakeDailyMissions } from '@api/fake-data-api';
import { Mission } from '@hooks/useMissionsScreen';

interface Course {
  id: number;
  subject: string;
  title: string;
  lastAccessed: string;
  progress: number;
  color: string;
}

export interface UseHomeScreenOptions {
  navigation?: NativeStackNavigationProp<AuthStackParamList>;
}

export interface UseHomeScreenReturn {
  dailyMissions: Mission[];
  completedMissions: number;
  totalMissions: number;
  error: string | null;
}

export function useHomeScreen(options: UseHomeScreenOptions = {}): UseHomeScreenReturn {
  const [dailyMissions, setDailyMissions] = useState<Mission[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/missions')
      .then(res => res.json())
      .then((data: Mission[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setDailyMissions(data);
        } else {
          setError('Aucune mission trouvée.');
          setDailyMissions([]);
        }
      })
      .catch(() => {
        setDailyMissions(fakeDailyMissions);
      });
  }, []);

  const completedMissions = useMemo(() => (
    dailyMissions.filter(mission => mission.completed).length
  ), [dailyMissions]);

  const totalMissions = useMemo(() => dailyMissions.length, [dailyMissions]);


  return {
    dailyMissions,
    completedMissions,
    totalMissions,
    error
  };
}

export default useHomeScreen;


