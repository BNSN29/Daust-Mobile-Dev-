import React from 'react';
import { Alert, Button } from 'react-native';  
import { Stack } from "expo-router";

export default function App() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4A90E2', 
        },
        headerTintColor: '#fff',  
        headerTitleStyle: {
          fontSize: 20,  
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{
          title: 'Home',
          headerRight: () => <></>,
          headerShown:false
        }}
      />
      <Stack.Screen 
        name="detail" 
        options={{
          title: 'Detail',
          headerRight: () => <HeaderButton title="Options" onPress={() =>Alert.alert('Options clicked')} />,
        }}
      />
      <Stack.Screen 
        name="setting" 
        options={{
          title: 'Setting',
          headerRight: () => <HeaderButton title="Info" onPress={() => alert('Info clicked')} />,
        }}
      />
    </Stack>
  );
}


const HeaderButton = ({ title, onPress }) => (
  <Button title={title} color="lightgrey" onPress={onPress} />
);
