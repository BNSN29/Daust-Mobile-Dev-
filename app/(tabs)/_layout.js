import { Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#128C7E', // WhatsApp green
        tabBarInactiveTintColor: '#8F8F8F',
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTitleAlign: 'left',
      }}
    >
      <Tabs.Screen
        name="chats"
        options={{
          title: "Chats",
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubble" size={24} color={color} />
          ),
          headerRight: () => (
            <Ionicons 
              name="search" 
              size={24} 
              color="#128C7E" 
              style={{ marginRight: 15 }} 
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="status"
        options={{
          title: "Status",
          tabBarIcon: ({ color }) => (
            <Ionicons name="ellipsis-horizontal-circle" size={24} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="calls"
        options={{
          title: "Calls",
          tabBarIcon: ({ color }) => (
            <Ionicons name="call" size={24} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#128C7E',
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  tabBar: {
    backgroundColor: '#fff',
    borderTopColor: '#E0E0E0',
  }
});