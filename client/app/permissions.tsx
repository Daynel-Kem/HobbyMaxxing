import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';

interface PermissionStatus {
  location: boolean;
  camera: boolean;
  photos: boolean;
}

export default function PermissionsScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState<PermissionStatus>({
    location: false,
    camera: false,
    photos: false,
  });
  const [requestedPermissions, setRequestedPermissions] = useState<Set<string>>(
    new Set()
  );

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log('Location permission status:', status);
      if (status === 'granted') {
        setPermissions((prev) => ({ ...prev, location: true }));
        setRequestedPermissions((prev) => new Set(prev).add('location'));
      } else {
        setRequestedPermissions((prev) => new Set(prev).add('location'));
        Alert.alert('Permission Denied', 'Location permission was denied');
      }
    } catch (error) {
      console.error('Location permission error:', error);
      Alert.alert('Error', 'Failed to request location permission');
    }
  };

  const requestCameraPermission = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      console.log('Camera permission status:', status);
      if (status === 'granted') {
        setPermissions((prev) => ({ ...prev, camera: true }));
        setRequestedPermissions((prev) => new Set(prev).add('camera'));
      } else {
        setRequestedPermissions((prev) => new Set(prev).add('camera'));
        Alert.alert('Permission Denied', 'Camera permission was denied');
      }
    } catch (error) {
      console.error('Camera permission error:', error);
      Alert.alert('Error', 'Failed to request camera permission');
    }
  };

  const requestPhotoLibraryPermission = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log('Photo library permission status:', status);
      if (status === 'granted') {
        setPermissions((prev) => ({ ...prev, photos: true }));
        setRequestedPermissions((prev) => new Set(prev).add('photos'));
      } else {
        setRequestedPermissions((prev) => new Set(prev).add('photos'));
        Alert.alert('Permission Denied', 'Photo library permission was denied');
      }
    } catch (error) {
      console.error('Photo library permission error:', error);
      Alert.alert('Error', 'Failed to request photo library permission');
    }
  };

  const handleAllPermissions = async () => {
    setLoading(true);
    try {
      // Request all permissions sequentially and wait for completion
      await Promise.all([
        requestLocationPermission(),
        requestCameraPermission(),
        requestPhotoLibraryPermission(),
      ]);

      // Small delay to ensure state updates are processed
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mark permissions as requested in AsyncStorage
      await AsyncStorage.setItem('permissionsRequested', 'true');

      // Navigate to landing page
      setLoading(false);
      router.replace('/landing');
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Failed to process permissions');
    }
  };

  const handleSkip = async () => {
    try {
      // Mark permissions as requested even if user skips
      await AsyncStorage.setItem('permissionsRequested', 'true');
      router.replace('/landing');
    } catch (error) {
      Alert.alert('Error', 'Failed to save preferences');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Setup Complete!</Text>
        <Text style={styles.headerSubtitle}>We need a few permissions to enhance your experience</Text>
      </View>

      {/* Permissions List */}
      <View style={styles.permissionsContainer}>
        {/* Location */}
        <View style={styles.permissionCard}>
          <View style={styles.permissionHeader}>
            <Text style={styles.permissionIcon}>📍</Text>
            <View style={styles.permissionText}>
              <Text style={styles.permissionTitle}>Location</Text>
              <Text style={styles.permissionDescription}>
                Find local classes near you
              </Text>
            </View>
            {permissions.location && (
              <Text style={styles.checkmark}>✓</Text>
            )}
          </View>
          {!permissions.location && !requestedPermissions.has('location') && (
            <TouchableOpacity
              style={styles.requestButton}
              onPress={requestLocationPermission}
              disabled={loading}>
              <Text style={styles.requestButtonText}>Request</Text>
            </TouchableOpacity>
          )}
          {permissions.location && (
            <Text style={styles.grantedText}>✓ Granted</Text>
          )}
        </View>

        {/* Camera */}
        <View style={styles.permissionCard}>
          <View style={styles.permissionHeader}>
            <Text style={styles.permissionIcon}>📷</Text>
            <View style={styles.permissionText}>
              <Text style={styles.permissionTitle}>Camera</Text>
              <Text style={styles.permissionDescription}>
                Take photos for your profile
              </Text>
            </View>
            {permissions.camera && (
              <Text style={styles.checkmark}>✓</Text>
            )}
          </View>
          {!permissions.camera && !requestedPermissions.has('camera') && (
            <TouchableOpacity
              style={styles.requestButton}
              onPress={requestCameraPermission}
              disabled={loading}>
              <Text style={styles.requestButtonText}>Request</Text>
            </TouchableOpacity>
          )}
          {permissions.camera && (
            <Text style={styles.grantedText}>✓ Granted</Text>
          )}
        </View>

        {/* Photo Library */}
        <View style={styles.permissionCard}>
          <View style={styles.permissionHeader}>
            <Text style={styles.permissionIcon}>🖼️</Text>
            <View style={styles.permissionText}>
              <Text style={styles.permissionTitle}>Photo Library</Text>
              <Text style={styles.permissionDescription}>
                Upload photos from your device
              </Text>
            </View>
            {permissions.photos && (
              <Text style={styles.checkmark}>✓</Text>
            )}
          </View>
          {!permissions.photos && !requestedPermissions.has('photos') && (
            <TouchableOpacity
              style={styles.requestButton}
              onPress={requestPhotoLibraryPermission}
              disabled={loading}>
              <Text style={styles.requestButtonText}>Request</Text>
            </TouchableOpacity>
          )}
          {permissions.photos && (
            <Text style={styles.grantedText}>✓ Granted</Text>
          )}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleAllPermissions}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.continueButtonText}>Grant All Permissions</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.skipButton}
          onPress={handleSkip}
          disabled={loading}>
          <Text style={styles.skipButtonText}>Skip for Now</Text>
        </TouchableOpacity>
      </View>

      {/* Info Text */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          You can manage these permissions later in your device settings.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 30,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  permissionsContainer: {
    padding: 20,
  },
  permissionCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  permissionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  permissionIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  permissionText: {
    flex: 1,
  },
  permissionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  permissionDescription: {
    fontSize: 14,
    color: '#666',
  },
  checkmark: {
    fontSize: 24,
    color: '#34C759',
    marginLeft: 10,
  },
  requestButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  requestButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  grantedText: {
    color: '#34C759',
    fontSize: 14,
    fontWeight: '600',
    paddingVertical: 10,
  },
  actionsContainer: {
    padding: 20,
  },
  continueButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  skipButton: {
    borderWidth: 2,
    borderColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  infoText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});
