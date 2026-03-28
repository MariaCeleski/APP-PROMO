import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/app/HomeScreen';
import CreatePromotionScreen from '../screens/app/CreatePromotionScreen';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CreatePromotion" component={CreatePromotionScreen} />
    </Stack.Navigator>
  );
}