import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ImageBackground,
} from "react-native";
import { useRef } from "react";

export default function PromotionCard({ item, onToggleFavorite }: any) {
  const scale = useRef(new Animated.Value(1)).current;

  function animate() {
    Animated.sequence([
      Animated.timing(scale, { toValue: 1.3, duration: 150, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri:
            item.image_url ||
            "https://via.placeholder.com/300x200",
        }}
        style={styles.image}
        imageStyle={{ borderRadius: 16 }}
      >
        <View style={styles.overlay} />

        {/* ❤️ */}
        <TouchableOpacity
          style={styles.heart}
          onPress={() => {
            animate();
            onToggleFavorite(item);
          }}
        >
          <Animated.Text style={{ transform: [{ scale }], fontSize: 22 }}>
            {item.isFavorite ? "❤️" : "🤍"}
          </Animated.Text>
        </TouchableOpacity>

        {/* 💰 */}
        <View style={styles.priceBadge}>
          <Text style={styles.price}>
            R$ {Number(item.price).toFixed(2)}
          </Text>
        </View>

        {/* INFO */}
        <View style={styles.info}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.store}>{item.store}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  image: {
    height: 180,
    padding: 12,
    justifyContent: "space-between",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 16,
  },

  heart: {
    position: "absolute",
    top: 10,
    right: 10,
  },

  priceBadge: {
    backgroundColor: "#D4AF37",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
  },

  price: {
    fontWeight: "bold",
  },

  info: {
    marginTop: "auto",
  },

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  store: {
    color: "#D9D9D9",
  },
});