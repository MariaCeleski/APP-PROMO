import { ScrollView, View, Image, Text, StyleSheet } from "react-native";

export default function StoriesBar({ promotions }: any) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {promotions.slice(0, 10).map((item: any) => (
          <View key={item.id} style={styles.story}>
            <Image
              source={{
                uri:
                  item.image_url ||
                  "https://via.placeholder.com/100",
              }}
              style={styles.image}
            />
            <Text style={styles.text} numberOfLines={1}>
              {item.store}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    marginVertical: 10,
  },

  story: {
    alignItems: "center",
    width: 70,
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#1E5FD8",
  },

  text: {
    color: "#fff",
    fontSize: 11,
    marginTop: 4,
  },
});