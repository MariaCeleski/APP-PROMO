import { TouchableOpacity, Text, StyleSheet, Animated, View } from 'react-native';
import { useRef } from 'react';

export default function FloatingButton({ onPress }: any) {
  const scale = useRef(new Animated.Value(1)).current;

  function handlePressIn() {
    Animated.spring(scale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  }

  function handlePressOut() {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale }],
        },
      ]}
    >

       <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Text style={styles.text}>＋</Text>
      </TouchableOpacity>

       {/* ÍCONE */}
      <View style={styles.button}>
        <Text style={styles.plus}>+</Text>
      </View>

      {/* PLACEHOLDER */}
      <Text style={styles.label}>Nova promoção</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    position: "absolute",
    bottom: 90,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#1E5FD8",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },

  plus: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },

  label: {
    backgroundColor: "#1E293B",
    color: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    fontSize: 13,
  },
});