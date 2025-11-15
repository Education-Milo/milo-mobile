import React, { useMemo, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Route } from '@react-navigation/native';
import TypographyComponent from '@components/Typography.component';
import { colors } from '@theme/colors';

interface NavItem {
  icon: keyof typeof Ionicons.glyphMap;
  routeName: string;
  isCenter?: boolean;
}

function BottomNavBar(props: BottomTabBarProps) {
  const { state, navigation } = props;

  const [showMenu, setShowMenu] = React.useState(false);
  const menuAnimation = useRef(new Animated.Value(0)).current;

  const menuItems = useMemo(() => [
    {
      label: 'Profile',
      icon: 'person-circle-outline',
      routeName: 'Profile',
      color: '#6B9BD1' // Bleu
    },
    {
      label: 'Amis',
      icon: 'people-circle-outline',
      routeName: 'Friends',
      color: '#D4A5D4' // Violet/Rose
    },
    {
      label: 'Missions',
      icon: 'flag-outline',
      routeName: 'Missions',
    }
  ], []);

  const navItems: NavItem[] = [
    { icon: 'home', routeName: 'Home' },
    { icon: 'reader', routeName: 'Lessons' },
    { icon: 'add', routeName: 'Scan', isCenter: true },
    { icon: 'trophy', routeName: 'Game' },
    { icon: 'ellipsis-horizontal', routeName: 'More' },
  ];

  React.useEffect(() => {
    Animated.timing(menuAnimation, {
      toValue: showMenu ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [showMenu, menuAnimation]);

  const handleTabPress = (route: Route<string>, isFocused: boolean) => {
    if (route.name === 'More') {
      setShowMenu(prev => !prev);
      return;
    }
    if (showMenu) {
      setShowMenu(false);
    }

    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  const isMoreActive = showMenu;

  const handleMenuItemPress = (routeName: string) => {
    setShowMenu(false);
    navigation.navigate(routeName);
  };

  const routes = state.routes;
  const menuHeight = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, menuItems.length * 60 + 16],
  });




  const MenuModal = () => {
    return (
      <>
        {menuItems.map((item, index) => (
            <React.Fragment key={item.label}>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => handleMenuItemPress(item.routeName)}
                    activeOpacity={0.7}
                >
                    <View style={[styles.menuIconContainer, { backgroundColor: item.color }]}>
                        <Ionicons
                            name={item.icon as any}
                            size={28}
                            color="#FFFFFF"
                        />
                    </View>
                    <TypographyComponent variant="body" style={styles.menuItemText}>
                        {item.label}
                    </TypographyComponent>
                </TouchableOpacity>
                {index < menuItems.length - 1 && <View style={styles.divider} />}
            </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <View style={styles.fullNavBarWrapper}>
      {showMenu && <MenuModal />}
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
                  isFocused && !navItem.isCenter && {
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
                  <View style={{ position: 'relative' }}>
                    <Ionicons
                      name={navItem.icon}
                      size={25}
                      color={
                        navItem.routeName === 'More'
                          ? (isMoreActive ? '#FF8C00' : '#8E8E93')
                          : (isFocused ? '#FF8C00' : '#8E8E93')
                      }
                    />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
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
  fullNavBarWrapper: {
    position: 'relative',
    zIndex: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: "transparent",
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  menuContainer: {
    position: 'absolute',
    bottom: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    paddingVertical: 8,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 }, // Très légère ombre
    shadowOpacity: 0.05, // Très faible opacité
    shadowRadius: 1, // Très faible rayon
    elevation: 2, // Faible élévation pour Android
    zIndex: 2,
},
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  menuIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2C2C2E',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5', // Couleur du séparateur (gris clair)
    marginHorizontal: 0, // Enlever les marges pour qu'il aille de bord à bord
},
});

export default BottomNavBar;