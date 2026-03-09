import React, { useMemo, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Animated,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Route } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TypographyComponent from '@components/Typography.component';

interface NavItem {
  icon: keyof typeof Ionicons.glyphMap;
  routeName: string;
  isCenter?: boolean;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

function BottomNavBar(props: BottomTabBarProps) {
  const { state, navigation } = props;
  const insets = useSafeAreaInsets();

  const [showMenu, setShowMenu] = React.useState(false);
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const menuItems = useMemo(() => [
    {
      label: 'Profile',
      icon: 'person-circle-outline',
      routeName: 'Profile',
      color: '#6B9BD1'
    },
    {
      label: 'Amis',
      icon: 'people-circle-outline',
      routeName: 'Friends',
      color: '#D4A5D4'
    },
    {
      label: 'Missions',
      icon: 'flag-outline',
      routeName: 'MissionScreen',
      color: '#F4A261'
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
    if (showMenu) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 65,
          friction: 9,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: SCREEN_HEIGHT,
          useNativeDriver: true,
          tension: 65,
          friction: 9,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showMenu, slideAnim, fadeAnim]);

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

  const handleMenuItemPress = (routeName: string) => {
    setShowMenu(false);
    navigation.navigate(routeName);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const routes = state.routes;

  // Calcul de la hauteur de la navbar
  const navbarHeight = Platform.OS === 'ios' ? 78 + insets.bottom : 66;

  return (
    <>
      {/* Overlay avec backdrop */}
      {showMenu && (
        <TouchableWithoutFeedback onPress={closeMenu}>
          <Animated.View 
            style={[
              styles.overlay,
              {
                opacity: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                }),
              }
            ]}
          />
        </TouchableWithoutFeedback>
      )}

      {/* Menu modal qui s'ouvre par-dessus tout */}
      {showMenu && (
        <Animated.View
          style={[
            styles.menuModalContainer,
            {
              paddingBottom: navbarHeight + 16,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.menuHandle} />
          <View style={styles.menuContent}>
            <TypographyComponent variant="h3" style={styles.menuTitle}>
              Menu
            </TypographyComponent>
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
          </View>
        </Animated.View>
      )}

      {/* Navbar fixe en bas */}
      <View style={styles.navBarWrapper}>
        <View style={[styles.navBarContainer, { backgroundColor: '#FFF8F1' }]}>
          <View style={[styles.navBarContent, { paddingBottom: Platform.OS === 'ios' ? insets.bottom : 0 }]}>
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
                    <View style={[styles.centerButton]}>
                      <Ionicons name={navItem.icon} size={20} color='#FFF' />
                    </View>
                  ) : (
                    <View style={{ position: 'relative' }}>
                      <Ionicons
                        name={navItem.icon}
                        size={25}
                        color={
                          navItem.routeName === 'More'
                            ? (showMenu ? '#FF8C00' : '#8E8E93')
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
    </>
  );
}

const styles = StyleSheet.create({
  navBarWrapper: {
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  navBarContainer: {
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingTop: 6,
    elevation: 5,
  },
  navBarContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 6,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  navItemCenter: {
    flex: 0,
    marginHorizontal: 8,
  },
  centerButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FF8C00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    zIndex: 998,
  },
  menuModalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF8F1',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 999,
    elevation: 10,
  },
  menuHandle: {
    width: 36,
    height: 4,
    backgroundColor: '#C7C7CC',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  menuContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C2C2E',
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
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
    backgroundColor: '#E5E5E5',
    marginVertical: 4,
  },
});

export default BottomNavBar;