import React from 'react';
import { View, TouchableOpacity, Text, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from '@constants/Colors';
import { RootStackParamList } from './types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface BottomNavBarProps {
  navigation: NavigationProp;
  currentRoute: string;
}

interface NavItem {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: keyof RootStackParamList;
  isCenter?: boolean;
}

function BottomNavBar({ navigation, currentRoute }: BottomNavBarProps) {
  const navItems: NavItem[] = [
    { name: 'Accueil', icon: 'home', route: 'Home' },
    { name: 'Cours', icon: 'reader', route: 'Lesson' },
    { name: '', icon: 'add', route: 'Scan', isCenter: true },
    { name: 'Duel', icon: 'trophy', route: 'Game' },
    { name: 'Profil', icon: 'person', route: 'Profile' },
  ];

  const handleNavigation = (route: keyof RootStackParamList) => {
    navigation.navigate(route as any);
  };

  return (
    <View style={[styles.navBarContainer, { backgroundColor: '#FFFFFF' }]}>
      <View style={styles.navBarContent}>
        {navItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.navItem,
              item.isCenter && styles.navItemCenter,
              currentRoute === item.route &&
                !item.isCenter && {
                  transform: [{ scale: 1.1 }],
                },
            ]}
            onPress={() => handleNavigation(item.route)}
            activeOpacity={0.7}
          >
            {item.isCenter ? (
              <View style={[styles.centerButton, { elevation: 8 }]}>
                <Ionicons name={item.icon} size={24} color='#FFF' />
              </View>
            ) : (
              <>
                <View style={{ position: 'relative' }}>
                  <Ionicons
                    name={item.icon}
                    size={22}
                    color={currentRoute === item.route ? '#FF8C00' : '#8E8E93'}
                  />
                  {currentRoute === item.route }
                </View>
                <Text
                  style={[
                    styles.navItemText,
                    currentRoute === item.route && styles.navItemTextActive,
                  ]}
                >
                  {item.name}
                </Text>
              </>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default BottomNavBar;
