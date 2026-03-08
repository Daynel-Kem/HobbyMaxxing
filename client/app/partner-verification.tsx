import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import BottomNavigation from '../components/bottom-navigation';

export default function PartnerVerificationScreen() {
  const router = useRouter();
  const { updatePartnerStatus } = useAuth();

  const handleBack = () => {
    router.back();
  };

  const handleCompleteVerification = () => {
    // TODO: Implement actual verification logic
    // For now, just update partner status
    updatePartnerStatus(true);
    router.replace('/partners');
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Partner Verification</Text>
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>✓</Text>
            <Text style={styles.emptyTitle}>Verification Process</Text>
            <Text style={styles.emptyText}>
              This is a placeholder for the partner verification page. Here you can verify your organization and begin the partnership application process.
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Steps</Text>
            <Text style={styles.bulletPoint}>1. Submit your organization details</Text>
            <Text style={styles.bulletPoint}>2. Verify your business information</Text>
            <Text style={styles.bulletPoint}>3. Review partnership terms</Text>
            <Text style={styles.bulletPoint}>4. Complete verification</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Required Information</Text>
            <Text style={styles.bulletPoint}>• Organization name</Text>
            <Text style={styles.bulletPoint}>• Business registration number</Text>
            <Text style={styles.bulletPoint}>• Contact information</Text>
            <Text style={styles.bulletPoint}>• Business description</Text>
          </View>

          <TouchableOpacity style={styles.completeButton} onPress={handleCompleteVerification}>
            <Text style={styles.completeButtonText}>Complete Verification</Text>
          </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#f8f9fa',
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
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
  infoCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  bulletPoint: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    lineHeight: 20,
  },
  completeButton: {
    backgroundColor: '#28a745',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
    alignItems: 'center',
  },
  completeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

