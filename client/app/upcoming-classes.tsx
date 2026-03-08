import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';
import BottomNavigation from '../components/bottom-navigation';

export default function UpcomingClassesScreen() {
  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Upcoming Classes</Text>
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📅</Text>
            <Text style={styles.emptyTitle}>Your Upcoming Classes</Text>
            <Text style={styles.emptyText}>
              This is a placeholder for your enrolled upcoming classes. Here you can view and manage classes you've signed up for.
            </Text>
          </View>

          <View style={styles.placeholderCard}>
            <Text style={styles.placeholderTitle}>Class #1</Text>
            <Text style={styles.placeholderText}>Placeholder for upcoming class details</Text>
          </View>

          <View style={styles.placeholderCard}>
            <Text style={styles.placeholderTitle}>Class #2</Text>
            <Text style={styles.placeholderText}>Placeholder for upcoming class details</Text>
          </View>
        </View>
      </ScrollView>
      <BottomNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 70,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#f8f9fa',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  placeholderCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  placeholderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  placeholderText: {
    fontSize: 14,
    color: '#666',
  },
});
