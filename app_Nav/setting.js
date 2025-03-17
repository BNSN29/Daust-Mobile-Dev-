import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import CustomButton from './Components/btn';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={{ uri: 'https://picsum.photos/seed/settings/1080/1920' }}
      style={styles.background}
    >
      <View style={styles.container}>
        <CustomButton
          title="Back to Home"
          onPress={() => router.push('/')}
          backgroundColor="#FFEEAD"
        />
        <CustomButton
          title="Go to Details"
          onPress={() => router.push('/detail')}
          backgroundColor="#D4A5A5"
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});