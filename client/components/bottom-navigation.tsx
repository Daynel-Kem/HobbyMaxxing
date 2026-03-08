import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { usePathname, Link } from 'expo-router';

interface BottomNavItem {
  label: string;
  icon: string;
  route: string;
}

const NAV_ITEMS: BottomNavItem[] = [
  { label: 'Partner', icon: '🤝', route: '/partners' },
  { label: 'Search', icon: '🔍', route: '/search' },
  { label: 'Home', icon: '🏠', route: '/landing' },
  { label: 'Credits', icon: '💎', route: '/credits' },
  { label: 'Profile', icon: '👤', route: '/account' },
];

export default function BottomNavigation() {
  const pathname = usePathname();

  const isActive = (route: string) => {
    return pathname === route;
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigationBar}>
        {NAV_ITEMS.map((item) => (
          <Link key={item.route} href={item.route as any} asChild>
            <TouchableOpacity
              style={styles.navItem}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.navIcon,
                  isActive(item.route) && styles.navIconActive,
                ]}
              >
                {item.icon}
              </Text>
              <Text
                style={[
                  styles.navLabel,
                  isActive(item.route) && styles.navLabelActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 12,
    paddingHorizontal: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  navIconActive: {
    fontSize: 28,
  },
  navLabel: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  navLabelActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
