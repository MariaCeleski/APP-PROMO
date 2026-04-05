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

        return merged.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.id === item.id)
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
    }, [user?.id])
  );

  async function onRefresh() {
    setRefreshing(true);
    setPage(1);
    setHasMore(true);
    await loadData(1);
  }

  async function loadMore() {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    const next = page + 1;
    setPage(next);

    await loadData(next);
  }

  function handleToggleFavorite(item: any) {
    setPromotions((prev) =>
      prev.map((p) =>
        p.id === item.id ? { ...p, isFavorite: !p.isFavorite } : p
      )
    );
  }

  const filteredPromotions =
    selectedCategory === "Todos"
      ? promotions
      : promotions.filter(
          (p) =>
            p.category?.toLowerCase() ===
            selectedCategory.toLowerCase()
        );

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
  // UI
  // =========================
  return (
    <View style={styles.container}>
      
      {/* TOPO */}
      <View style={styles.topContent}>
        
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

        <CategoryFilter
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <StoriesBar
          promotions={promotions.filter((p) => p.image_url)}
          onPress={(item: any) =>
            navigation.navigate("StoryView", {
              item,
              promotions: promotions.filter((p) => p.image_url),
            })
          }
        />
      </View>

      {/* LISTA */}
      <FlatList
        data={filteredPromotions}
        keyExtractor={(item) => item.id.toString()}
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 140,
          gap: 12,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        renderItem={({ item }: any) => (
          <PromotionCard
            item={item}
            onToggleFavorite={handleToggleFavorite}
            onPress={() =>
              navigation.navigate("StoryView", {
                item,
                promotions: promotions.filter((p) => p.image_url),
              })
            }
          />
        )}
        ListEmptyComponent={
          loading ? (
            <Text style={styles.emptyText}>Carregando...</Text>
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate("CreatePromotion")}
            >
              <Text style={styles.emptyText}>
                Criar sua primeira promoção 🚀
              </Text>
            </TouchableOpacity>
          )
        }
      />

      {/* BOTÃO SAIR FIXO */}
      <View style={styles.logoutContainer}>
        <Button title="Sair" onPress={signOut} />
      </View>

      {/* FAB */}
      <FloatingButton
        onPress={() => navigation.navigate("CreatePromotion")}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },

  topContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  card: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#E2E8F0",
    marginTop: 6,
  },

  emptyText: {
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 40,
  },

  logoutContainer: {
  position: "absolute",
  bottom: 20,
  left: 16,
  right: 16,
  backgroundColor: "rgba(30, 41, 59, 0.9)",
  padding: 8,
  borderRadius: 16,
},
});