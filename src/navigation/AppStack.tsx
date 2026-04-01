import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/app/HomeScreen";
import CreatePromotionScreen from "../screens/app/CreatePromotionScreen";
import StoryView from "../screens/app/StoryView";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CreatePromotion"
        component={CreatePromotionScreen}
        options={{ title: "Nova Promoção" }}
      />

      <Stack.Screen
        name="StoryView"
        component={StoryView}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}