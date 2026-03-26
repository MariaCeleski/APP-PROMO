import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
});
export default function Card({ children }: any) {
  return (
 <LinearGradient
  colors={theme.gradient}
  style={styles.container}
>
  {children}
</LinearGradient>
  );
}

