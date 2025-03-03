import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  useEffect(() => {
    // Simulate a loading time of 1.5 seconds before redirecting to tabs
    const timer = setTimeout(() => {
      router.replace('/(tabs)/chats');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image 
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png' }} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>WhatsApp</Text>
      </View>

      {/* Loading Indicator */}
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#128C7E" />
        <Text style={styles.loadingText}>Connecting...</Text>
      </View>
      
      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>from</Text>
        <View style={styles.metaContainer}>
          <Text style={styles.metaText}>Meta</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#128C7E',
  },
  loadingContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    color: '#666',
    fontSize: 14,
    marginBottom: 5,
  },
  metaContainer: {
    paddingHorizontal: 10,
  },
  metaText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});