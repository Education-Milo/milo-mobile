import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Route } from '@react-navigation/native';
import TypographyComponent from '@components/Typography.component';

interface NavItem {
  icon: keyof typeof Ionicons.glyphMap;
  routeName: string;
  isCenter?: boolean;
}

function BottomNavBar(props: BottomTabBarProps) {
  const { state, navigation } = props;

  const navItems: NavItem[] = [
    { icon: 'home', routeName: 'Home' },
    { icon: 'reader', routeName: 'Lessons' },
    { icon: 'add', routeName: 'Scan', isCenter: true },
    { icon: 'trophy', routeName: 'Game' },
    { icon: 'person', routeName: 'Profile' },
  ];

  const handleTabPress = (route: Route<string>, isFocused: boolean) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  const routes = state.routes;

  return (
    <View style={[styles.navBarContainer, { backgroundColor: '#FFF8F1' }]}>
      <View style={styles.navBarContent}>
        {routes.map((route, index) => {
          const navItem = navItems.find(item => item.routeName === route.name);
          const isFocused = state.index === index;

          if (!navItem) return null;
            return (
              <TouchableOpacity
                key={route.key}
                style={[
                  styles.navItem,
                  navItem.isCenter && styles.navItemCenter,
                  isFocused &&
                    !navItem.isCenter && {
                      transform: [{ scale: 1.1 }],
                    },
                ]}
                onPress={() => handleTabPress(route, isFocused)}
                activeOpacity={0.7}
              >
                {navItem.isCenter ? (
                  <View style={[styles.centerButton, { elevation: 8 }]}>
                    <Ionicons name={navItem.icon} size={20} color='#FFF' />
                  </View>
                ) : (
                  <>
                    <View style={{ position: 'relative' }}>
                      <Ionicons
                        name={navItem.icon}
                        size={25}
                        color={isFocused ? '#FF8C00' : '#8E8E93'}
                      />
                    </View>
                  </>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
}


const styles = StyleSheet.create({
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  navItemText: {
    fontSize: 10,
    color: '#8E8E93',
    marginTop: 2,
    fontWeight: '500',
  },
  navItemTextActive: {
    color: '#FF8C00',
    fontWeight: '600',
  },
  centerButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FF8C00',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF8C00',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  navBarContainer: {
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingBottom: Platform.OS === 'ios' ? 12 : 6,
    paddingTop: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  navBarContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  navItemCenter: {
    flex: 0,
    marginHorizontal: 8,
  },
})


export default BottomNavBar;
