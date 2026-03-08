import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';

interface PermissionStatus {
  location: boolean;
  camera: boolean;
  photos: boolean;
}

interface PermissionsComponentProps {
  onComplete: () => void;
}

export default function PermissionsComponent({ onComplete }: PermissionsComponentProps) {
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState<PermissionStatus>({
    location: false,
    camera: false,
    photos: false,
  });
  const [requestedPermissions, setRequestedPermissions] = useState<Set<string>>(
    new Set()
  );
  const [showPermissions, setShowPermissions] = useState(false);

  useEffect(() => {
    checkFirstTimeUser();
  }, []);

  const checkFirstTimeUser = async () => {
    try {
      const permissionsRequested = await AsyncStorage.getItem('permissionsRequested');
      if (!permissionsRequested) {
        setShowPermissions(true);
      }
    } catch (error) {
      console.error('Error checking permissions status:', error);
    }
  };

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

      // Hide permissions component
      setLoading(false);
      setShowPermissions(false);
      onComplete();
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Failed to process permissions');
    }
  };

  const handleSkip = async () => {
    try {
      // Mark permissions as requested even if user skips
      await AsyncStorage.setItem('permissionsRequested', 'true');
      setShowPermissions(false);
      onComplete();
    } catch (error) {
      Alert.alert('Error', 'Failed to save preferences');
    }
  };

  if (!showPermissions) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
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
          </View>

          {/* Camera */}
          <View style={styles.permissionCard}>
            <View style={styles.permissionHeader}>
              <Text style={styles.permissionIcon}>📷</Text>
              <View style={styles.permissionText}>
                <Text style={styles.permissionTitle}>Camera</Text>
                <Text style={styles.permissionDescription}>
                  Take photos for your profile and classes
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
          </View>

          {/* Photo Library */}
          <View style={styles.permissionCard}>
            <View style={styles.permissionHeader}>
              <Text style={styles.permissionIcon}>🖼️</Text>
              <View style={styles.permissionText}>
                <Text style={styles.permissionTitle}>Photo Library</Text>
                <Text style={styles.permissionDescription}>
                  Access your photos for profiles and classes
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
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.skipButton, loading && styles.disabledButton]}
            onPress={handleSkip}
            disabled={loading}>
            <Text style={styles.skipButtonText}>Skip for Now</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.continueButton, loading && styles.disabledButton]}
            onPress={handleAllPermissions}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.continueButtonText}>Continue</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    margin: 20,
    maxWidth: 400,
    width: '90%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  permissionsContainer: {
    marginBottom: 24,
  },
  permissionCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  permissionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  permissionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  permissionText: {
    flex: 1,
  },
  permissionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  permissionDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  checkmark: {
    fontSize: 20,
    color: '#28a745',
    fontWeight: 'bold',
  },
  requestButton: {
    backgroundColor: '#007AFF',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  requestButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  skipButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  skipButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  continueButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.6,
  },
});
