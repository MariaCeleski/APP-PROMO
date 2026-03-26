import { View, Text, StyleSheet, Animated, FlatList } from 'react-native';
import { useContext, useEffect, useState, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import PromotionCard from '../../components/PromotionCard';
import { AuthContext } from '../../contexts/AuthContext';
import { signOut } from '../../services/auth';
import { getUserProfile } from '../../services/user';
import Button from '../../components/ui/Button';
import Skeleton from '../../components/ui/Skeleton';

export default function HomeScreen() {
  const { user } = useContext(AuthContext);

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const promotions = [
    { id: '1', title: 'Coca-Cola 2L', price: 7.99, store: 'Mercado X' },
    { id: '2', title: 'Arroz 5kg', price: 19.9, store: 'Atacadão' },
  ];

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    async function loadUser() {
      if (user?.id) {
        const data = await getUserProfile(user.id);
        setProfile(data);
      }
      setLoading(false); // 👈 FINALIZA SEMPRE
    }

    loadUser();

    // animação
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, [user]);

  return (
    <View style={styles.container}>
      
      {/* CARD DO USUÁRIO */}
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}
      >
        <LinearGradient
          colors={['#0F3FA8', '#1E5FD8', '#2C73E0']}
          style={styles.card}
        >
          <Text style={styles.title}>BALY 💙</Text>

          <Text style={styles.subtitle}>
            Bem-vinda, {profile?.name || 'Carregando...'}
          </Text>
        </LinearGradient>
      </Animated.View>

      {/* LISTA / LOADING */}
      <View style={{ marginTop: 20 }}>

        {loading ? (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          <FlatList
            data={promotions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PromotionCard item={item} />
            )}
          />
        )}

      </View>

      {/* BOTÃO SAIR */}
      <View style={{ marginTop: 20 }}>
        <Button title="Sair" onPress={signOut} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F3FA8',
    padding: 20,
  },

  card: {
    borderRadius: 16,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 10,
  },
});