import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Mock user profile data
const userProfile = {
  name: 'John Smith',
  status: 'Available',
  avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  phone: '+1 (555) 123-4567',
};

// Settings menu items
const menuItems = [
  {
    id: 'account',
    icon: 'key',
    title: 'Account',
    description: 'Security notifications, change number',
    iconBgColor: '#128C7E',
  },
  {
    id: 'privacy',
    icon: 'lock-closed',
    title: 'Privacy',
    description: 'Block contacts, disappearing messages',
    iconBgColor: '#0066CC',
  },
  {
    id: 'chats',
    icon: 'chatbubble',
    title: 'Chats',
    description: 'Theme, wallpapers, chat history',
    iconBgColor: '#4CAF50',
  },
  {
    id: 'notifications',
    icon: 'notifications',
    title: 'Notifications',
    description: 'Message, group & call tones',
    iconBgColor: '#FF3B30',
  },
  {
    id: 'storage',
    icon: 'folder',
    title: 'Storage and Data',
    description: 'Network usage, auto-download',
    iconBgColor: '#34C759',
  },
  {
    id: 'help',
    icon: 'help-circle',
    title: 'Help',
    description: 'Help center, contact us, privacy policy',
    iconBgColor: '#5856D6',
  },
  {
    id: 'invite',
    icon: 'heart',
    title: 'Invite a Friend',
    description: '',
    iconBgColor: '#FF9500',
  },
];

// Component for rendering each menu item
const MenuItem = ({ item }) => {
  return (
    <TouchableOpacity style={styles.menuItem}>
      <View style={[styles.iconContainer, { backgroundColor: item.iconBgColor }]}>
        <Ionicons name={item.icon} size={22} color="#fff" />
      </View>
      
      <View style={styles.menuItemContent}>
        <Text style={styles.menuItemTitle}>{item.title}</Text>
        {item.description !== '' && (
          <Text style={styles.menuItemDescription}>{item.description}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default function SettingsScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* User Profile Section */}
      <TouchableOpacity style={styles.profileSection}>
        <Image source={{ uri: userProfile.avatar }} style={styles.profileImage} />
        
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{userProfile.name}</Text>
          <Text style={styles.profileStatus}>{userProfile.status}</Text>
        </View>
        
        <Ionicons name="qr-code" size={24} color="#128C7E" />
      </TouchableOpacity>
      
      {/* Settings Menu */}
      <View style={styles.menuContainer}>
        {menuItems.map(item => (
          <MenuItem key={item.id} item={item} />
        ))}
      </View>
      
      {/* App Info */}
      <View style={styles.appInfo}>
        <Text style={styles.appInfoText}>WhatsApp Clone from Expo</Text>
        <Text style={styles.appInfoVersion}>Version 2.25.3</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileSection: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 15,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  profileStatus: {
    fontSize: 14,
    color: '#8F8F8F',
  },
  menuContainer: {
    backgroundColor: '#fff',
    marginTop: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
  },
  menuItem: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#8F8F8F',
    marginTop: 2,
  },
  appInfo: {
    padding: 20,
    alignItems: 'center',
  },
  appInfoText: {
    fontSize: 14,
    color: '#8F8F8F',
  },
  appInfoVersion: {
    fontSize: 14,
    color: '#8F8F8F',
    marginTop: 5,
  },
});