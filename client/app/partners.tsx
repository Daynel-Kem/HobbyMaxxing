import React, { useState } from 'react';
import { Alert } from 'react-native';
import { createClass } from '../services/api';

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import BottomNavigation from '../components/bottom-navigation';

export default function PartnersScreen() {
  const router = useRouter();
  const { isPartner } = useAuth();
  const [classTitle, setClassTitle] = useState('');
  const [classDescription, setClassDescription] = useState('');
  const [classPrice, setClassPrice] = useState('');
  const [classDate, setClassDate] = useState('');
  const [classTime, setClassTime] = useState('');
  const [classCapacity, setClassCapacity] = useState('');
  const [classLocation, setClassLocation] = useState('');
  const [classTags, setClassTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const handleVerification = () => {
    router.push('/partner-verification');
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== '' && !classTags.includes(tagInput.trim())) {
      setClassTags([...classTags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (index: number) => {
    setClassTags(classTags.filter((_, i) => i !== index));
  };

  const handleCreateClass = async () => {
    try {
      if (
        !classTitle ||
        !classDescription ||
        !classPrice ||
        !classDate ||
        !classTime ||
        !classCapacity ||
        !classLocation
      ) {
        Alert.alert('Missing Fields', 'Please fill all class details');
        return;
      }

      const payload = {
        title: classTitle,
        description: classDescription,
        price: parseFloat(classPrice),
        date: classDate,
        time: classTime,
        capacity: parseInt(classCapacity, 10),
        location: classLocation,
        tags: classTags,
        host: 'Community Partner',
        category: classTags[0] || 'General',
        photos: [],
      };

      const result = await createClass(payload);

      if (result.status === 'success') {
        Alert.alert('Success', `Class created with ID ${result.data.id}`);

        setClassTitle('');
        setClassDescription('');
        setClassPrice('');
        setClassDate('');
        setClassTime('');
        setClassCapacity('');
        setClassLocation('');
        setClassTags([]);
        setTagInput('');
      } else {
        Alert.alert('Error', 'Could not create class');
      }
    } catch (error) {
      console.error('Create class error:', error);
      Alert.alert('Error', 'Could not create class');
    }
  };
  if (isPartner) {
    return (
      <View style={styles.wrapper}>
        <ScrollView style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Create a Class</Text>
          </View>

          {/* Content */}
          <View style={styles.contentContainer}>
            <View style={styles.formCard}>
              <Text style={styles.formTitle}>Class Details</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Class Title</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter class title"
                  value={classTitle}
                  onChangeText={setClassTitle}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Description</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Enter class description"
                  value={classDescription}
                  onChangeText={setClassDescription}
                  multiline
                  numberOfLines={3}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Price ($)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0.00"
                  value={classPrice}
                  onChangeText={setClassPrice}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Date</Text>
                <TextInput
                  style={styles.input}
                  placeholder="MM/DD/YYYY"
                  value={classDate}
                  onChangeText={setClassDate}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Time</Text>
                <TextInput
                  style={styles.input}
                  placeholder="HH:MM AM/PM"
                  value={classTime}
                  onChangeText={setClassTime}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Capacity</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Number of students"
                  value={classCapacity}
                  onChangeText={setClassCapacity}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Location</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Class location"
                  value={classLocation}
                  onChangeText={setClassLocation}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Tags</Text>
                <View style={styles.tagInputContainer}>
                  <TextInput
                    style={[styles.input, styles.tagInput]}
                    placeholder="Add a tag..."
                    value={tagInput}
                    onChangeText={setTagInput}
                  />
                  <TouchableOpacity 
                    style={styles.addTagButton}
                    onPress={handleAddTag}
                  >
                    <Text style={styles.addTagButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
                
                {classTags.length > 0 && (
                  <View style={styles.tagsContainer}>
                    {classTags.map((tag, index) => (
                      <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                        <TouchableOpacity 
                          onPress={() => handleRemoveTag(index)}
                          style={styles.tagRemoveButton}
                        >
                          <Text style={styles.tagRemoveText}>×</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}
              </View>

              <TouchableOpacity style={styles.createButton} onPress={handleCreateClass}>
                <Text style={styles.createButtonText}>Create Class</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <BottomNavigation />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Become a Partner</Text>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🤝</Text>
          <Text style={styles.emptyTitle}>Join Our Partner Network</Text>
          <Text style={styles.emptyText}>
            Grow your business and expand your reach by partnering with our community. We're looking for organizations that share our values.
          </Text>
        </View>

        <View style={styles.partnerCard}>
          <Text style={styles.cardTitle}>Why Become a Partner?</Text>
          <Text style={styles.bulletPoint}>• Reach thousands of community members</Text>
          <Text style={styles.bulletPoint}>• Collaborate on meaningful projects</Text>
          <Text style={styles.bulletPoint}>• Build brand awareness and credibility</Text>
        </View>

        <View style={styles.partnerCard}>
          <Text style={styles.cardTitle}>Requirements</Text>
          <Text style={styles.bulletPoint}>• Share community values</Text>
          <Text style={styles.bulletPoint}>• Committed to quality service</Text>
          <Text style={styles.bulletPoint}>• Willingness to collaborate</Text>
        </View>

        <View style={styles.partnerCard}>
          <Text style={styles.cardTitle}>Get Started</Text>
          <Text style={styles.cardText}>
            Ready to become a partner? Contact us to learn more about partnership opportunities and next steps.
          </Text>
          <TouchableOpacity 
            style={styles.verificationButton}
            onPress={handleVerification}
          >
            <Text style={styles.verificationButtonText}>Start Verification</Text>
          </TouchableOpacity>
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
  partnerCard: {
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
  cardText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  verificationButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 16,
    alignItems: 'center',
  },
  verificationButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  formCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  createButton: {
    backgroundColor: '#28a745',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
    alignItems: 'center',
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  tagInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tagInput: {
    flex: 1,
    marginRight: 8,
  },
  addTagButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTagButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 6,
  },
  tagRemoveButton: {
    marginLeft: 4,
  },
  tagRemoveText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});