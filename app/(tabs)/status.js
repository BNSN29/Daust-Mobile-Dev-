import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Dummy data for status updates
const myStatus = {
  hasStatus: false,
  lastUpdate: 'Tap to add status update',
  image: 'https://randomuser.me/api/portraits/men/3.jpg',
};

const recentUpdates = [
  {
    id: '1',
    name: 'Sarah Williams',
    time: '15 minutes ago',
    isSeen: false,
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: '2',
    name: 'John Doe',
    time: '37 minutes ago',
    isSeen: false,
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
];

const viewedUpdates = [
  {
    id: '3',
    name: 'David Johnson',
    time: '2 hours ago',
    isSeen: true,
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    id: '4',
    name: 'Emily Clark',
    time: 'Today, 10:24 AM',
    isSeen: true,
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: '5',
    name: 'Michael Brown',
    time: 'Today, 9:15 AM',
    isSeen: true,
    image: 'https://randomuser.me/api/portraits/men/4.jpg',
  },
];

// Component for rendering a status item
const StatusItem = ({ item, isMyStatus = false }) => {
  return (
    <TouchableOpacity style={styles.statusItem}>
      <View style={styles.statusImageContainer}>
        <Image source={{ uri: item.image }} style={styles.statusImage} />
        {!isMyStatus && (
          <View 
            style={[
              styles.statusIndicator,
              { borderColor: item.isSeen ? '#8F8F8F' : '#128C7E' }
            ]}
          />
        )}
        {isMyStatus && (
          <View style={styles.addStatusButton}>
            <Ionicons name="add" size={18} color="#fff" />
          </View>
        )}
      </View>
      
      <View style={styles.statusInfo}>
        <Text style={styles.statusName}>
          {isMyStatus ? 'My Status' : item.name}
        </Text>
        <Text style={styles.statusTime}>
          {isMyStatus ? myStatus.lastUpdate : item.time}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function StatusScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* My Status */}
        <StatusItem item={myStatus} isMyStatus={true} />
        
        {/* Recent Updates */}
        {recentUpdates.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>Recent updates</Text>
            {recentUpdates.map(item => (
              <StatusItem key={item.id} item={item} />
            ))}
          </View>
        )}
        
        {/* Viewed Updates */}
        {viewedUpdates.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>Viewed updates</Text>
            {viewedUpdates.map(item => (
              <StatusItem key={item.id} item={item} />
            ))}
          </View>
        )}
      </ScrollView>
      
      {/* Camera FAB */}
      <TouchableOpacity style={styles.cameraFab}>
        <Ionicons name="camera" size={24} color="#fff" />
      </TouchableOpacity>
      
      {/* Pencil FAB */}
      <TouchableOpacity style={styles.pencilFab}>
        <Ionicons name="pencil" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sectionHeader: {
    fontSize: 14,
    color: '#8F8F8F',
    padding: 15,
    paddingBottom: 5,
    backgroundColor: '#f5f5f5',
  },
  statusItem: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  statusImageContainer: {
    position: 'relative',
    marginRight: 15,
  },
  statusImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  statusIndicator: {
    position: 'absolute',
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2,
    left: -2,
    top: -2,
  },
  addStatusButton: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#128C7E',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: '#fff',
  },
  statusInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  statusName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 3,
  },
  statusTime: {
    color: '#8F8F8F',
    fontSize: 14,
  },
  cameraFab: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ebebeb',
    justifyContent: 'center',
    alignItems: 'center',
    right: 20,
    bottom: 85,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
  },
  pencilFab: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#128C7E',
    justifyContent: 'center',
    alignItems: 'center',
    right: 20,
    bottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});