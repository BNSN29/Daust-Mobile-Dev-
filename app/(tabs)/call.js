import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Dummy data for call history
const callsData = [
  {
    id: '1',
    name: 'Sarah Williams',
    time: 'Today, 1:45 PM',
    isVideoCall: true,
    isMissed: false,
    isIncoming: true,
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: '2',
    name: 'John Doe',
    time: 'Today, 12:30 PM',
    isVideoCall: false,
    isMissed: true,
    isIncoming: true,
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '3',
    name: 'Sarah Williams',
    time: 'Yesterday, 9:15 PM',
    isVideoCall: false,
    isMissed: false,
    isIncoming: false,
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: '4',
    name: 'David Johnson',
    time: 'Yesterday, 4:20 PM',
    isVideoCall: true,
    isMissed: false,
    isIncoming: false,
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    id: '5',
    name: 'Emily Clark',
    time: '3/1/25, 10:24 AM',
    isVideoCall: false,
    isMissed: true,
    isIncoming: true,
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: '6',
    name: 'Work Group',
    time: '2/28/25, 2:15 PM',
    isVideoCall: false,
    isMissed: false,
    isIncoming: true,
    avatar: null, // Group call
    participants: 4,
  },
];

// Component for rendering each call item
const CallItem = ({ item }) => {
  return (
    <TouchableOpacity style={styles.callItem}>
      <View style={styles.avatarContainer}>
        {item.avatar ? (
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.groupAvatar]}>
            <Ionicons name="people" size={24} color="#fff" />
          </View>
        )}
      </View>
      
      <View style={styles.callInfo}>
        <View style={styles.callHeader}>
          <Text style={styles.callName}>{item.name}</Text>
          <TouchableOpacity>
            <Ionicons 
              name={item.isVideoCall ? "videocam" : "call"} 
              size={22} 
              color="#128C7E" 
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.callFooter}>
          <View style={styles.callDetailContainer}>
            <Ionicons 
              name={item.isIncoming ? "arrow-down" : "arrow-up"} 
              size={16} 
              color={item.isMissed ? "#FF3B30" : "#8F8F8F"} 
              style={{ marginRight: 5 }}
            />
            <Text style={[
              styles.callDetail, 
              item.isMissed && styles.missedCall
            ]}>
              {item.time}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function CallsScreen() {
  const [selectedTab, setSelectedTab] = useState('all'); // 'all' or 'missed'
  
  const filteredCalls = selectedTab === 'missed' 
    ? callsData.filter(call => call.isMissed)
    : callsData;
  
  return (
    <View style={styles.container}>
      {/* Tab selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[
            styles.tab, 
            selectedTab === 'all' && styles.selectedTab
          ]}
          onPress={() => setSelectedTab('all')}
        >
          <Text style={[
            styles.tabText,
            selectedTab === 'all' && styles.selectedTabText
          ]}>
            ALL
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tab, 
            selectedTab === 'missed' && styles.selectedTab
          ]}
          onPress={() => setSelectedTab('missed')}
        >
          <Text style={[
            styles.tabText,
            selectedTab === 'missed' && styles.selectedTabText
          ]}>
            MISSED
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={filteredCalls}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CallItem item={item} />}
      />
      
      {/* Floating Action Button for new call */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="call" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#128C7E',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8F8F8F',
  },
  selectedTabText: {
    color: '#128C7E',
  },
  callItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  groupAvatar: {
    backgroundColor: '#128C7E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  callInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  callHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    alignItems: 'center',
  },
  callName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  callFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callDetail: {
    color: '#8F8F8F',
    fontSize: 14,
  },
  missedCall: {
    color: '#FF3B30', // Red color for missed calls
  },
  fab: {
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