import { View, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function StoryView({ route, navigation }: any) {
  const { item } = route.params;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.goBack()}
    >
      <Image source={{ uri: item.image_url }} style={styles.image} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "80%",
  },
});