import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  HomeTabsParamList,
  AuthScreenNames,
} from '@navigation/Auth/authNavigator.model';
import { useUserStore } from '@store/user/user.store';
import HomeScreen from '@screens/HomeScreen';
import LessonScreen from '@screens/LessonScreen';
import ProfileScreen from '@screens/ProfileScreen';
import GameScreen from '@screens/GameScreen';
import BottomNavBar from '@components/BottomNavBar';
import SelectDocumentScreen from '@screens/SelectDocumentScreen';

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
        <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default HomeTabsNavigator;
