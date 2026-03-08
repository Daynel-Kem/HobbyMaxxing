import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sampleClasses } from '../data/sampleClasses';
import BottomNavigation from '@/components/bottom-navigation';

export default function ClassDetailsPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const classItem = sampleClasses.find(item => String(item.id) === String(id));

  if (!classItem) {
    return (
      <View style={styles.container}>
        <Text>Class not found</Text>
      </View>
    );
  }

  const handleEnroll = async () => {
    try {
      const existing = await AsyncStorage.getItem('enrolledClasses');
      const enrolledIds = existing ? JSON.parse(existing) : [];

      if (!enrolledIds.includes(classItem.id)) {
        enrolledIds.push(classItem.id);
        await AsyncStorage.setItem('enrolledClasses', JSON.stringify(enrolledIds));
      }

      Alert.alert('Success', `${classItem.title} enrolled successfully`, [
        {
          text: 'Go to Account',
          onPress: () => router.push('/account'),
        },
        {
          text: 'OK',
        },
      ]);
    } catch (error) {
      console.error('Enroll error:', error);
      Alert.alert('Error', 'Could not enroll in class');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{classItem.title}</Text>
        <Text style={styles.description}>{classItem.description}</Text>

        <Text style={styles.detail}>Date: {classItem.date}</Text>
        <Text style={styles.detail}>Time: {classItem.time}</Text>
        <Text style={styles.detail}>Capacity: {classItem.capacity}</Text>
        <Text style={styles.detail}>Location: {classItem.location}</Text>
        <Text style={styles.detail}>Host: {classItem.host}</Text>
        <Text style={styles.detail}>Price: ${classItem.price}</Text>

        <TouchableOpacity style={styles.button} onPress={handleEnroll}>
          <Text style={styles.buttonText}>Confirm Enroll</Text>
        </TouchableOpacity>
      </View>
      <BottomNavigation />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
    marginTop: 40,
    height: 850,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 22,
  },
  detail: {
    fontSize: 15,
    color: '#333',
    marginBottom: 8,
  },
  button: {
    marginTop: 24,
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
