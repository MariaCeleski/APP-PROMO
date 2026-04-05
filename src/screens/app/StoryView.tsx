import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { useEffect, useRef, useState } from "react";

const { width, height } = Dimensions.get("window");

export default function StoryView({ route, navigation }: any) {
  const { item, promotions } = route.params;

  const list = promotions || [item];
  const initialIndex = list.findIndex((p: any) => p.id === item.id);

  const [currentIndex, setCurrentIndex] = useState(
    initialIndex >= 0 ? initialIndex : 0,
  );

  const progress = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const current = list[currentIndex];
  const [imageIndex, setImageIndex] = useState(0);

  const images = current?.images?.length ? current.images : [current.image_url];

  // =========================
  // PROGRESS BAR AUTO
  // =========================
  useEffect(() => {
    progress.setValue(0);

    Animated.timing(progress, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) nextImage();
    });
  }, [imageIndex, currentIndex]);

  function next() {
    if (currentIndex < list.length - 1) {
      setCurrentIndex((prev: any) => prev + 1);
    } else {
      navigation.goBack();
    }
  }

  function prev() {
    if (currentIndex > 0) {
      setCurrentIndex((prev: any) => prev - 1);
    }
  }

  function nextImage() {
    if (imageIndex < images.length - 1) {
      setImageIndex((prev) => prev + 1);
    } else {
      setImageIndex(0);
      next(); // próxima promoção
    }
  }

  function prevImage() {
    if (imageIndex > 0) {
      setImageIndex((prev) => prev - 1);
    } else {
      prev(); // volta promoção anterior
    }
  }

  // =========================
  // TAP (lado esquerdo/direito)
  // =========================
  function handlePress(evt: any) {
    const x = evt.nativeEvent.locationX;
    if (x < width / 2) {
      prevImage();
    } else {
      nextImage();
    }
  }

  // =========================
  // SWIPE DOWN (FECHAR)
  // =========================
  function handleMove(evt: any) {
    const y = evt.nativeEvent.pageY;
    translateY.setValue(y - height / 2);
  }

  function handleRelease(evt: any) {
    if (evt.nativeEvent.pageY > height * 0.7) {
      navigation.goBack();
    } else {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }

  return (
    <TouchableWithoutFeedback
      onPress={handlePress}
      onPressIn={handleMove}
      onPressOut={handleRelease}
    >
      <Animated.View
        style={[styles.container, { transform: [{ translateY }] }]}
      >
        {/* IMAGE */}
        <Image
          source={{ uri: images[imageIndex] }}
          style={styles.image}
        />

        {/* PROGRESS BAR */}
        <View style={styles.progressContainer}>
          {images.map((_:any, index:any) => (
            <View key={index} style={styles.progressBackground}>
              {index === imageIndex && (
                <Animated.View
                  style={[
                    styles.progressBar,
                    { flex: progress },
                  ]}
                />
              )}
            </View>
          ))}
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

// =========================
// STYLES PREMIUM
// =========================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  progressContainer: {
    position: "absolute",
    top: 50,
    left: 10,
    right: 10,
    flexDirection: "row",
    gap: 4,
  },
  progressBackground: {
    flex: 1,
    height: 3,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#fff",
  },
});
