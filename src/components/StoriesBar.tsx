import {
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useRef } from "react";

type Promotion = {
  id: string;
  store: string;
  image_url?: string;
  viewed?: boolean;
};

type Props = {
  promotions: Promotion[];
  onPress: (item: Promotion) => void;
};

export default function StoriesBar({ promotions, onPress }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {promotions.slice(0, 10).map((item) => (
          <StoryItem key={item.id} item={item} onPress={onPress} />
        ))}
      </View>
    </ScrollView>
  );
}


// =======================
// ITEM COM ANIMAÇÃO
// =======================
function StoryItem({ item, onPress }: any) {
  const scale = useRef(new Animated.Value(1)).current;

  function handlePress() {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    onPress(item);
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View style={[styles.story, { transform: [{ scale }] }]}>
        
        {/* 🔥 BORDA ESTILO INSTAGRAM */}
        <View
          style={[
            styles.border,
            item.viewed && styles.viewedBorder, // cinza se visto
          ]}
        >
          <Image
            source={{
              uri:
                item.image_url ||
                "https://via.placeholder.com/100",
            }}
            style={styles.image}
          />
        </View>

        <Text style={styles.text} numberOfLines={1}>
          {item.store}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

// =======================
// STYLES PREMIUM
// =======================
const styles = StyleSheet.create({
 container: {
  flexDirection: "row",
  marginBottom: 20,
  paddingLeft: 4,
},

 story: {
  alignItems: "center",
  width: 70,
  marginRight: 12,
},

  border: {
    padding: 2,
    borderRadius: 40,
    backgroundColor: "#FF007A", // 🔥 rosa instagram
  },

  viewedBorder: {
    backgroundColor: "#555", // visto
  },

  image: {
  width: 64,
  height: 64,
  borderRadius: 32,
  borderWidth: 2,
  borderColor: "#1E5FD8",
},

  text: {
    color: "#fff",
    fontSize: 11,
    marginTop: 4,
    textAlign: "center",
  },
});