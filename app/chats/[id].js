import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';

// Mock message data
const generateMockMessages = (contactId) => {
  // This would normally come from a database or API
  const mockConversations = {
    '1': [
      { id: '1', text: 'Hey, How is Ramadan Going?', isMe: false, timestamp: '10:28 AM' },
      { id: '2', text: 'Good So Far Alhamdoulilah', isMe: true, timestamp: '10:29 AM' },
      { id: '3', text: 'What about you?', isMe: true, timestamp: '10:29 AM' },
      { id: '4', text: 'Pretty Hot', isMe: false, timestamp: '10:30 AM' },
    ],
    '2': [
      { id: '1', text: 'Are we still meeting for dinner?', isMe: false, timestamp: '5:28 PM' },
      { id: '2', text: 'Yes, 7pm at the usual place', isMe: true, timestamp: '5:35 PM' },
      { id: '3', text: 'Perfect, see you then!', isMe: false, timestamp: '5:36 PM' },
    ],
  };
  
  return mockConversations[contactId] || [];
};

// Message bubble component
const MessageBubble = ({ message }) => {
  return (
    <View style={[
      styles.messageBubbleContainer,
      message.isMe ? styles.myMessageContainer : styles.theirMessageContainer
    ]}>
      <View style={[
        styles.messageBubble,
        message.isMe ? styles.myMessage : styles.theirMessage
      ]}>
        <Text style={styles.messageText}>{message.text}</Text>
        <Text style={styles.messageTimestamp}>{message.timestamp}</Text>
      </View>
    </View>
  );
};

export default function ChatScreen() {
  // Get contact details from URL params
  const params = useLocalSearchParams();
  const { id, name, avatar } = params;
  
  // Placeholder for when data isn't passed correctly
  const contactName = name || 'Chat';
  const contactAvatar = avatar || 'https://randomuser.me/api/portraits/men/1.jpg';
  
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef(null);
  
  // Load mock messages based on contact ID
  useEffect(() => {
    if (id) {
      setMessages(generateMockMessages(id));
    }
  }, [id]);
  
  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (messages.length > 0 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({ animated: false });
      }, 100);
    }
  }, [messages]);
  
  // Send a new message
  const handleSend = () => {
    if (newMessage.trim() === '') return;
    
    const newMsg = {
      id: Date.now().toString(),
      text: newMessage,
      isMe: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };
  
  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Chat Header */}
      <View style={styles.header}>
        <Image source={{ uri: contactAvatar }} style={styles.avatar} />
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{contactName}</Text>
          <Text style={styles.headerStatus}>Online</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="videocam" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="call" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="ellipsis-vertical" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Messages List */}
      <FlatList
        ref={flatListRef}
        style={styles.messagesList}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <MessageBubble message={item} />}
        contentContainerStyle={styles.messagesContainer}
      />
      
      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachButton}>
          <Ionicons name="add" size={24} color="#8F8F8F" />
        </TouchableOpacity>
        
        <TextInput
          style={styles.input}
          placeholder="Message"
          value={newMessage}
          onChangeText={setNewMessage}
          multiline
        />
        
        {newMessage.trim() === '' ? (
          <TouchableOpacity style={styles.micButton}>
            <Ionicons name="mic" size={24} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Ionicons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5DDD5', // WhatsApp chat background color
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#128C7E',
    padding: 10,
    paddingTop: 12,
    paddingBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  headerStatus: {
    color: '#E0E0E0',
    fontSize: 12,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 15,
  },
  messagesList: {
    flex: 1,
  },
  messagesContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  messageBubbleContainer: {
    marginVertical: 3,
    maxWidth: '80%',
  },
  myMessageContainer: {
    alignSelf: 'flex-end',
  },
  theirMessageContainer: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    position: 'relative',
  },
  myMessage: {
    backgroundColor: '#DCF8C6', // WhatsApp green bubble for my messages
  },
  theirMessage: {
    backgroundColor: '#fff', // White bubble for their messages
  },
  messageText: {
    fontSize: 16,
    marginRight: 30, // Space for timestamp
  },
  messageTimestamp: {
    fontSize: 11,
    color: '#8F8F8F',
    position: 'absolute',
    bottom: 5,
    right: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  attachButton: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    maxHeight: 100,
  },
  micButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#128C7E',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#128C7E',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});