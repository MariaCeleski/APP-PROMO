import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from "react-native";

const categories = [
  { name: "Todos", icon: "🔥" },
  { name: "Mercado", icon: "🛒" },
  { name: "Restaurante", icon: "🍔" },
  { name: "Farmácia", icon: "💊" },
  { name: "Eletrônico", icon: "📱" },
  { name: "Loja", icon: "🛒" },
  { name: "Conveniência", icon: "🛒" },
];

export default function CategoryFilter({ selected, onSelect }: any) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {categories.map((cat) => {
          const active = selected === cat.name;

          return (
            <TouchableOpacity
              key={cat.name}
              onPress={() => onSelect(cat.name)}
              style={[styles.item, active && styles.active]}
            >
              <Text style={styles.icon}>{cat.icon}</Text>
              <Text style={styles.text}>{cat.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
 container: {
  flexDirection: "row",
  gap: 10,
  marginBottom: 16,
},

  item: {
  paddingVertical: 8,
  paddingHorizontal: 14,
  borderRadius: 12,
  backgroundColor: "#1E293B",
  marginRight: 8,
},

 active: {
  backgroundColor: "#1E5FD8",
},

  icon: {
    fontSize: 20,
  },

  text: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
  },
});