import { TouchableOpacity, Text, StyleSheet, Animated, View } from 'react-native';
import { useState, useRef, useEffect } from 'react';

export default function PromotionCard({ item, onToggleFavorite }: any) {
  const [liked, setLiked] = useState(item.isFavorite);

  const scale = useRef(new Animated.Value(1)).current;

  // 🔥 SINCRONIZA COM O ITEM
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

    // 🔥 atualiza UI imediatamente
    const newValue = !liked;
    setLiked(newValue);

    // 🔥 envia valor correto pra tela
    onToggleFavorite({
      ...item,
      isFavorite: newValue,
    });
  }

  return (
    <View style={styles.card}>
      
      {/* ❤️ BOTÃO */}
      <TouchableOpacity style={styles.heart} onPress={handlePress}>
        <Animated.Text style={{ fontSize: 20, transform: [{ scale }] }}>
          {liked ? '❤️' : '🤍'}
        </Animated.Text>
      </TouchableOpacity>

      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>R$ {Number(item.price).toFixed(2)}</Text>
      <Text style={styles.store}>{item.store}</Text>
        
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: '#1E5FD8',
  },
  heart: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
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