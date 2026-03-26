import { Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRef, useEffect } from 'react';

export default function PromotionCard({ item }: any) {
  const fade = useRef(new Animated.Value(0)).current;
  const translate = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translate, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: fade,
        transform: [{ translateY: translate }],
      }}
    >
      <LinearGradient
        colors={['#0F3FA8', '#1E5FD8', '#2C73E0']}
        style={styles.card}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>R$ {item.price}</Text>
        <Text style={styles.store}>{item.store}</Text>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  price: {
    color: '#D4AF37',
    fontSize: 16,
    marginTop: 4,
  },
  store: {
    color: '#D9D9D9',
    fontSize: 14,
    marginTop: 2,
  },
});