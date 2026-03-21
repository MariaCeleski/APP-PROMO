import { NavigationContainer } from '@react-navigation/native';
import { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

export function AppNavigator() {
const { user, loading } = useContext(AuthContext);
  if (loading) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator />
    </View>
  );
}
  return (
  <NavigationContainer key={user ? 'user' : 'guest'}>
    {user ? <AppStack /> : <AuthStack />}
  </NavigationContainer>
);
}