import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Dummy data for chat list
const chatData = [
  {
    id: '1',
    name: 'John Doe',
    message: 'Hey, how are you doing?',
    time: '10:30 AM',
    unread: 2,
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '2',
    name: 'Family Group',
    message: 'Mom: Are we still meeting for dinner?',
    time: 'Yesterday',
    unread: 0,
    avatar: null, // Group chat
  },
  {
    id: '3',
    name: 'Sarah Williams',
    message: 'I sent you the documents',
    time: 'Yesterday',
    unread: 0,
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: '4',
    name: 'Work Group',
    message: 'Alex: The meeting is postponed to 3PM',
    time: '3/2/25',
    unread: 5,
    avatar: null, // Group chat
  },
  {
    id: '5',
    name: 'David Johnson',
    message: 'Call me when you get a chance',
    time: '3/1/25',
    unread: 0,
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
];

// Component for rendering each chat item
const ChatItem = ({ item }) => {
const [unread, setUnread] = useState(item.id)
console.log("item is ", item)
const router = useRouter();

    const handlePress = () => {
        console.log("item is ", item.unread)
        item.unread> 0 ? setUnread[--item.unread] : null
        router.push({
          pathname: `/chats/${item.id}`,
          params: { 
            name: item.name,
            avatar: item.avatar || '' 
          }
        });
      };
  return (
    <TouchableOpacity style={styles.chatItem} onPress = {handlePress}>
      <View style={styles.avatarContainer}>
        {item.avatar ? (
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.groupAvatar]}>
            <Ionicons name="people" size={24} color="#fff" />
          </View>
        )}
      </View>
      
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        
        <View style={styles.chatFooter}>
          <Text style={styles.chatMessage} numberOfLines={1}>
            {item.message}
          </Text>
          
          {item.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function ChatsScreen() {

  return (
    <View style={styles.container}>
      <FlatList
        data={chatData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatItem item={item} />}
      />
      
      {/* Floating Action Button for new chat */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="chatbubble-ellipses" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatItem: {
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
  chatInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  chatName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  chatTime: {
    color: '#8F8F8F',
    fontSize: 12,
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatMessage: {
    color: '#8F8F8F',
    fontSize: 14,
    flex: 1,
    marginRight: 10,
  },
  unreadBadge: {
    backgroundColor: '#128C7E',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
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