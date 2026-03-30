import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  View,
  ImageBackground,
} from "react-native";
import { useState, useRef, useEffect } from "react";

export default function PromotionCard({ item, onToggleFavorite }: any) {
  const [liked, setLiked] = useState(item.isFavorite);

  const scale = useRef(new Animated.Value(1)).current;

  // 🔥 sincroniza com o estado da lista
  useEffect(() => {
    setLiked(item.isFavorite);
  }, [item.isFavorite]);

  function animateHeart() {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }

  function handlePress() {
    animateHeart();

    const newValue = !liked;
    setLiked(newValue);

    onToggleFavorite({
      ...item,
      isFavorite: newValue,
    });
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri:
            item.image_url ||
            "https://via.placeholder.com/300x200.png?text=Promoção",
        }}
        style={styles.image}
        imageStyle={{ borderRadius: 16 }}
      >
        {/* 🔥 OVERLAY */}
        <View style={styles.overlay} />

        {/* ❤️ FAVORITO */}
        <TouchableOpacity style={styles.heart} onPress={handlePress}>
          <Animated.Text style={{ fontSize: 22, transform: [{ scale }] }}>
            {liked ? "❤️" : "🤍"}
          </Animated.Text>
        </TouchableOpacity>

        {/* 💰 PREÇO */}
        <View style={styles.priceBadge}>
          <Text style={styles.price}>
            R$ {Number(item.price).toFixed(2)}
          </Text>
        </View>

        {/* 📄 INFO */}
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
    height: 160,
    justifyContent: "space-between",
    padding: 12,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
    borderRadius: 16,
  },

  heart: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
  },

  priceBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#D4AF37",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  price: {
    color: "#000",
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
    fontSize: 14,
  },
});