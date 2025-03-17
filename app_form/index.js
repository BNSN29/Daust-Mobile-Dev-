// App.js
import React from 'react';
import { View, Dimensions } from 'react-native';
import FormComponent from './Component/Form';

// Get screen dimensions
const { width } = Dimensions.get('window');

export default function App() {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
    }}>
      <FormComponent screenWidth={width} />
    </View>
  );
}