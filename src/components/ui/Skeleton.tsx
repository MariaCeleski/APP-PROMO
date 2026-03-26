import { View, StyleSheet } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';

export default function Skeleton() {
  return (
    <View style={styles.container}>
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={styles.card}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  card: {
    height: 100,
    borderRadius: 16,
  },
});