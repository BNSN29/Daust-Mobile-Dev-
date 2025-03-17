import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import CustomButton from './Components/btn';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={{ uri: 'https://picsum.photos/seed/home/1080/1920' }}
      style={styles.background}
    >
      <View style={styles.container}>
        <CustomButton
          title="Go to Details (Red)"
          onPress={() => router.push('/detail?color=red')}
          backgroundColor="red"
        />
        <CustomButton
          title="Go to Details (Green)"
          onPress={() => router.push('/detail?color=green')}
          backgroundColor="green"
        />
        <CustomButton
          title="Go to Details (Blue)"
          onPress={() => router.push('/detail?color=blue')}
          backgroundColor="blue"
        />
        
        <CustomButton
          title="Go to Settings"
          onPress={() => router.push('/setting')}
          backgroundColor="#4ECDC4"
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
