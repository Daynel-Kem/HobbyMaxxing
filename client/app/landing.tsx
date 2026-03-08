import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';
import BottomNavigation from '../components/bottom-navigation';
import PermissionsComponent from '../components/PermissionsComponent';

export default function LandingPage() {
  const handlePermissionsComplete = () => {
    // Permissions completed, user can now use the app normally
    console.log('Permissions setup completed');
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Welcome to Community</Text>
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          <View style={styles.welcomeCard}>
            <Text style={styles.welcomeIcon}>🏠</Text>
            <Text style={styles.welcomeTitle}>Welcome Home</Text>
            <Text style={styles.welcomeText}>
              This is the main landing page of the Community app. Here you can access all the features and navigate to different sections.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.cardTitle}>Quick Actions</Text>
            <Text style={styles.bulletPoint}>• Browse and search for classes</Text>
            <Text style={styles.bulletPoint}>• View your upcoming classes</Text>
            <Text style={styles.bulletPoint}>• Connect with partners</Text>
            <Text style={styles.bulletPoint}>• Manage your account</Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.cardTitle}>Getting Started</Text>
            <Text style={styles.cardText}>
              Use the navigation bar at the bottom to explore different sections of the app. Start by finding classes that interest you!
            </Text>
          </View>
        </View>
      </ScrollView>
      <BottomNavigation />
      <PermissionsComponent onComplete={handlePermissionsComplete} />
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
  welcomeCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 24,
    marginBottom: 20,
    alignItems: 'center',
  },
  welcomeIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  featureCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  bulletPoint: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
