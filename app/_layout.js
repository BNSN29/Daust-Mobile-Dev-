import { Stack } from "expo-router";


import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen 
          name="(tabs)" 
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}