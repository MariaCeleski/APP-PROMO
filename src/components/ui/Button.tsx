import { Text, TouchableWithoutFeedback, Animated, StyleSheet } from 'react-native';
import { useRef } from 'react';

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
};

export default function Button({ title, onPress, loading }: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={loading}
    >
      <Animated.View
        style={[
          styles.button,
          {
            transform: [{ scale }],
            opacity: loading ? 0.6 : 1,
          },
        ]}
      >
        <Text style={styles.text}>
          {loading ? 'Carregando...' : title}
        </Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1E5FD8',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});