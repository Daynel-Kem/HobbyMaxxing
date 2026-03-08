import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useAuth } from '../contexts/AuthContext';
import BottomNavigation from '../components/bottom-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sampleClasses } from '../data/sampleClasses';

export default function AccountScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: '',
    profileImage: null,
  });

  const loadEnrolledClasses = async () => {
    try {
      const saved = await AsyncStorage.getItem('enrolledClasses');
      const enrolledIds = saved ? JSON.parse(saved) : [];

      const matchedClasses = sampleClasses.filter(item =>
        enrolledIds.includes(item.id)
      );

      setEnrolledClasses(matchedClasses);
    } catch (error) {
      console.error('Error loading enrolled classes:', error);
    }
  };

  const loadProfile = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem('userProfile');

      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        setProfile({
          name: parsed.name || user?.displayName || 'User Name',
          email: parsed.email || user?.email || 'user@example.com',
          bio: parsed.bio || '',
          profileImage: parsed.profileImage || null,
        });
      } else {
        setProfile({
          name: user?.displayName || 'User Name',
          email: user?.email || 'user@example.com',
          bio: '',
          profileImage: null,
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  useEffect(() => {
    loadEnrolledClasses();
    loadProfile();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadEnrolledClasses();
      loadProfile();
    }, [user])
  );

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Account</Text>
        </View>

        <View style={styles.profileSection}>
          {profile.profileImage ? (
            <Image source={{ uri: profile.profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileAvatar}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
          )}

          <Text style={styles.profileName}>{profile.name || 'User Name'}</Text>
          <Text style={styles.profileEmail}>{profile.email || 'user@example.com'}</Text>

          {profile.bio ? (
            <Text style={styles.profileBio}>{profile.bio}</Text>
          ) : null}
        </View>

        <View style={styles.upcomingSection}>
          <View style={styles.upcomingHeader}>
            <Text style={styles.sectionTitle}>Your Upcoming Classes</Text>
          </View>

          {enrolledClasses.length === 0 ? (
            <View style={styles.upcomingCard}>
              <Text style={styles.upcomingIcon}>📅</Text>
              <Text style={styles.upcomingTitle}>No enrolled classes yet</Text>
              <Text style={styles.upcomingDetails}>
                Enroll from the Search page to see classes here
              </Text>
            </View>
          ) : (
            enrolledClasses.map((item) => (
              <View key={item.id} style={styles.upcomingCard}>
                <Text style={styles.upcomingIcon}>📅</Text>
                <Text style={styles.upcomingTitle}>{item.title}</Text>
                <Text style={styles.upcomingDetails}>
                  {item.date} • {item.time}
                </Text>
                <Text style={styles.upcomingDetails}>{item.location}</Text>
                <Text style={styles.upcomingDetails}>Host: {item.host}</Text>
              </View>
            ))
          )}
        </View>

        <View style={styles.settingsContainer}>
          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>Account Settings</Text>

            <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/edit-profile')}>
              <Text style={styles.settingIcon}>⚙️</Text>
              <Text style={styles.settingLabel}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingIcon}>🔐</Text>
              <Text style={styles.settingLabel}>Change Password</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingIcon}>🔔</Text>
              <Text style={styles.settingLabel}>Notifications</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>App Settings</Text>

            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingIcon}>🎨</Text>
              <Text style={styles.settingLabel}>Theme</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingIcon}>🌍</Text>
              <Text style={styles.settingLabel}>Language</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>Support</Text>

            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingIcon}>❓</Text>
              <Text style={styles.settingLabel}>FAQ & Help</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingIcon}>📧</Text>
              <Text style={styles.settingLabel}>Contact Us</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
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
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#f8f9fa',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 40,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  profileBio: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
    lineHeight: 20,
  },
  settingsContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  settingsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#999',
    textTransform: 'uppercase',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  upcomingSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#f8f9fa',
  },
  upcomingHeader: {
    marginBottom: 12,
  },
  upcomingCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  upcomingIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  upcomingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  upcomingDetails: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});