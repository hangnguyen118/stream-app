import React from 'react';
import {AuthProvider} from './AuthContext';
import RootStackNavigator from './navigation/RootStackNavigator';

export default function App() {
  return (
    <AuthProvider>  
      <RootStackNavigator/>
    </AuthProvider>
  );
};