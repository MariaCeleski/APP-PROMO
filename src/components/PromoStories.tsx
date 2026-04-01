import { ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function StoriesBar({ promotions, onPress }: any) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {promotions.map((item: any) => (
        <TouchableOpacity key={item.id} onPress={() => onPress(item)}>
          <Image
            source={{ uri: item.image_url }}
            style={styles.story}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  story: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
    borderWidth: 3,
    borderColor: "#D4AF37",
  },
});