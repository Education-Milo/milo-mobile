import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  HomeTabsParamList,
  AuthScreenNames,
} from '@navigation/Auth/authNavigator.model';
import { useUserStore } from '@store/user/user.store';
import HomeScreen from '@screens/HomeScreen';
import LessonScreen from '@screens/LessonScreen';
import GameScreen from '@screens/GameScreen';
import BottomNavBar from '@components/BottomNavBar';
import SelectDocumentScreen from '@screens/SelectDocumentScreen';
import { View } from 'react-native';
import MissionsScreen from '@screens/MissionScreen';
import ProfilScreen from '@screens/ProfileScreen';

const Tab = createBottomTabNavigator<HomeTabsParamList>();

const HomeTabsNavigator = () => {
  const { getMe } = useUserStore();

  useEffect(() => {
    getMe();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { display: 'none' },
      }}
      tabBar={props => <BottomNavBar {...props} />}
    >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Lessons" component={LessonScreen} />
        <Tab.Screen name="Scan" component={SelectDocumentScreen} />
        <Tab.Screen name="Game" component={GameScreen} />
        <Tab.Screen name="Friends" component={View} />
        <Tab.Screen name="Profile" component={ProfilScreen} />
        <Tab.Screen name="MissionScreen" component={MissionsScreen} />
        <Tab.Screen name="More" component={View} />
    </Tab.Navigator>
  );
};

export default HomeTabsNavigator;
