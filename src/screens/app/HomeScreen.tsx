import {
  View,
  Text,
  StyleSheet,
  Animated,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";

import { useContext, useEffect, useState, useRef, useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";

import StoriesBar from "../../components/StoriesBar";
import PromotionCard from "../../components/PromotionCard";
import CategoryFilter from "../../components/CategoryFilter";

import { AuthContext } from "../../contexts/AuthContext";
import { signOut } from "../../services/auth";
import { getUserProfile } from "../../services/user";
import { getPromotions } from "../../services/promotions";

import Button from "../../components/ui/Button";
import FloatingButton from "../../components/ui/FloatingButton";

export default function HomeScreen({ navigation }: any) {
  const { user } = useContext(AuthContext);

  const [promotions, setPromotions] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  // =========================
  // LOAD
  // =========================
  async function loadData(pageNumber = 1) {
    try {
      if (!user?.id) return;

      if (pageNumber === 1) setLoading(true);

      const userData = await getUserProfile(user.id);
      const promoData = await getPromotions(pageNumber);

      setProfile(userData);

      setPromotions((prev) => {
        const newData = promoData || [];
        const merged = pageNumber === 1 ? newData : [...prev, ...newData];

        // remove duplicados
        return merged.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.id === item.id),
        );
      });

      if (!promoData || promoData.length < 5) {
        setHasMore(false);
      }
    } catch (err) {
      console.log("ERRO:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLoadingMore(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (!user?.id) return;

      setPage(1);
      setHasMore(true);
      loadData(1);
    }, [user?.id]),
  );

  // =========================
  // REFRESH
  // =========================
  async function onRefresh() {
    setRefreshing(true);
    setPage(1);
    setHasMore(true);
    await loadData(1);
  }

  // =========================
  // PAGINAÇÃO
  // =========================
  async function loadMore() {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    const next = page + 1;
    setPage(next);

    await loadData(next);
  }

  // =========================
  // FAVORITOS
  // =========================
  function handleToggleFavorite(item: any) {
    setPromotions((prev) =>
      prev.map((p) =>
        p.id === item.id ? { ...p, isFavorite: !p.isFavorite } : p,
      ),
    );
  }

  // =========================
  // FILTRO
  // =========================
  const filteredPromotions =
    selectedCategory === "Todos"
      ? promotions
      : promotions.filter(
          (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase(),
        );

  // =========================
  // ANIMAÇÃO
  // =========================
  useEffect(() => {
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
  }, []);

  // =========================
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <Animated.View
        style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}
      >
        <LinearGradient
          colors={["#0F3FA8", "#1E5FD8", "#2C73E0"]}
          style={styles.card}
        >
          <Text style={styles.title}>Suas promoções</Text>
          <Text style={styles.subtitle}>
            Bem-vinda, {profile?.name || "Carregando..."}
          </Text>
        </LinearGradient>
      </Animated.View>

      {/* FILTRO */}
      <CategoryFilter
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <StoriesBar
        promotions={promotions.filter((p) => p.image_url)}
       onPress={(item: any) => navigation.navigate("StoryView", { item })}
      />

      {/* LISTA */}
      <FlatList
        data={filteredPromotions}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <PromotionCard item={item} onToggleFavorite={handleToggleFavorite} />
        )}
        ListEmptyComponent={
          loading ? (
            <Text style={{ color: "#fff", textAlign: "center", marginTop: 40 }}>
              Carregando...
            </Text>
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate("CreatePromotion")}
            >
              <Text
                style={{ color: "#D4AF37", textAlign: "center", marginTop: 40 }}
              >
                Criar sua primeira promoção 🚀
              </Text>
            </TouchableOpacity>
          )
        }
      />

      {/* BOTÃO */}
      <Button title="Sair" onPress={signOut} />

      {/* FAB */}
      <FloatingButton onPress={() => navigation.navigate("CreatePromotion")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  card: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginTop: 10,
  },

  skeleton: {
    height: 80,
    borderRadius: 12,
    backgroundColor: "#ccc",
    marginBottom: 10,
  },

  favorite: {
    position: "absolute",
    right: 10,
    top: 10,
  },
});
