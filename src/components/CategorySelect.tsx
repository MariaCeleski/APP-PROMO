import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { categories } from "../constants/categories";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function CategorySelect({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      {categories.map((cat) => {
        const active = value === cat.name;

        return (
          <TouchableOpacity
            key={cat.name}
            style={[styles.item, active && styles.active]}
            onPress={() => onChange(cat.name)}
          >
            <Text style={styles.icon}>{cat.icon}</Text>
            <Text style={styles.text}>{cat.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E293B",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },

  active: {
    backgroundColor: "#22C55E",
  },

  icon: {
    marginRight: 6,
  },

  text: {
    color: "#fff",
    fontWeight: "500",
  },
});