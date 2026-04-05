import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useState, useRef, useEffect } from "react";

type Props = {
  item: any;
  onToggleFavorite: (item: any) => void;
  onPress?: () => void;
};

export default function PromotionCard({
  item,
  onToggleFavorite,
  onPress,
}: Props) {
  const [liked, setLiked] = useState(item.isFavorite);

  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    setLiked(item.isFavorite);
  }, [item.isFavorite]);

  function animateHeart() {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.3,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  }

  function handleLike() {
    animateHeart();

    const newValue = !liked;
    setLiked(newValue);

    onToggleFavorite({
      ...item,
      isFavorite: newValue,
    });
  }

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri:
              item.image_url ||
              "https://via.placeholder.com/400x300",
          }}
          style={styles.image}
          imageStyle={{ borderRadius: 16 }}
        >
          {/* OVERLAY */}
          <View style={styles.overlay} />

          {/* ❤️ FAVORITO */}
          <TouchableOpacity style={styles.heart} onPress={handleLike}>
            <Animated.Text
              style={{ fontSize: 22, transform: [{ scale }] }}
            >
              {liked ? "❤️" : "🤍"}
            </Animated.Text>
          </TouchableOpacity>

          {/* 🏷 CATEGORIA */}
          {item.category && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {item.category}
              </Text>
            </View>
          )}

          {/* 📄 INFO */}
          <View style={styles.info}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.store}>{item.store}</Text>

            <View style={styles.footer}>
              <Text style={styles.price}>
                R$ {Number(item.price).toFixed(2)}
              </Text>

              <View style={styles.button}>
                <Text style={styles.buttonText}>
                  Ver oferta
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  image: {
    height: 180,
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

  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#FF3B30",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
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
    fontSize: 13,
  },

  footer: {
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  price: {
    color: "#FFD700",
    fontSize: 18,
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#22C55E",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});