import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeTabsParamList } from '@navigation/Auth/authNavigator.model';
import { useUserStore } from '@store/user/user.store';
import BottomNavBar from '@components/BottomNavBar';
import { getNavigationConfigForRole } from './role.configs';

const Tab = createBottomTabNavigator<HomeTabsParamList>();

const HomeTabsNavigator = () => {
  const { getMe } = useUserStore();
  const userRole = useUserStore((state) => state.getRole());

  useEffect(() => {
    getMe();
  }, []);

  // Obtenir la configuration des tabs selon le rôle
  const navigationConfig = getNavigationConfigForRole(userRole);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { display: 'none' },
      }}
      tabBar={props => <BottomNavBar {...props} />}
    >
      {navigationConfig.tabs.map((tab, index) => (
        <Tab.Screen
          key={`${tab.name}-${index}`}
          name={tab.name as keyof HomeTabsParamList}
          component={tab.component}
        />
      ))}
    </Tab.Navigator>
  );
};

export default HomeTabsNavigator;