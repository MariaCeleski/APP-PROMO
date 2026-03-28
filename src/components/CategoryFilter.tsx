import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const categories = [
  'Todos',
  'Mercado',
  'Restaurante',
  'Farmácia',
  'Bebidas',
];

export default function CategoryFilter({ selected, onSelect }: any) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginVertical: 10 }}
    >
      {categories.map((cat) => {
        const active = selected === cat;

        return (
          <TouchableOpacity
            key={cat}
            style={[styles.chip, active && styles.activeChip]}
            onPress={() => onSelect(cat)}
          >
            <Text style={[styles.text, active && styles.activeText]}>
              {cat}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#1E293B',
    borderRadius: 20,
    marginRight: 10,
  },
  activeChip: {
    backgroundColor: '#1E5FD8',
  },
  text: {
    color: '#CBD5F5',
    fontSize: 14,
  },
  activeText: {
    color: '#fff',
    fontWeight: '600',
  },
});