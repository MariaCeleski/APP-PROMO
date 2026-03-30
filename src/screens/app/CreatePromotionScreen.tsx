import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";

import { useForm, Controller } from "react-hook-form";
import { useContext, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { AuthContext } from "../../contexts/AuthContext";
import { createPromotion, updatePromotion } from "../../services/promotions";

import * as ImagePicker from "expo-image-picker";
import { Image, TouchableOpacity } from "react-native";
import { uploadImage } from "../../services/storage";

type FormData = {
  title: string;
  price: string;
  store: string;
  category: string;
  image_url: string;
};

export default function CreatePromotionScreen({ navigation }: any) {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const route = useRoute<any>();
  const editingItem = route.params?.item;

  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      title: editingItem?.title || "",
      price: editingItem?.price?.toString() || "",
      store: editingItem?.store || "",
      category: editingItem?.category || "",
      image_url: editingItem?.image_url || "",
    },
  });

  const [image, setImage] = useState<string | null>(
    editingItem?.image_url || null,
  );

  async function pickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permissão necessária!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  async function onSubmit(data: FormData) {
    try {
      if (!user?.id) return;

      setLoading(true);

      let imageUrl = null;

      if (image && !image.startsWith("http")) {
        imageUrl = await uploadImage(image, user.id);
      }

      const payload = {
        title: data.title,
        price: Number(data.price),
        store: data.store,
        category: data.category,
        image_url: imageUrl,
      };

      console.log("PAYLOAD:", payload);

      if (editingItem) {
        await updatePromotion(editingItem.id, payload);
      } else {
        await createPromotion(payload, user.id); // ✅ CORRETO
      }

      console.log("SALVOU REAL");

      reset();
      navigation.goBack();
    } catch (error) {
      console.log("ERRO AO SALVAR:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <LinearGradient
      colors={["#0F3FA8", "#1E5FD8", "#2C73E0"]}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>
          {editingItem ? "Editar Promoção" : "Nova Promoção"}
        </Text>
        {/*  AQUI FICA O PICKER DE IMAGEM */}
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Text style={{ color: "#fff" }}>Selecionar imagem</Text>
          )}
        </TouchableOpacity>

        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Título"
              placeholder="Ex: Coca-Cola 2L"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="price"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Preço"
              placeholder="Ex: 7.99"
              value={value}
              onChangeText={onChange}
              keyboardType="numeric"
            />
          )}
        />

        <Controller
          control={control}
          name="store"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Loja"
              placeholder="Ex: Mercado X"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="category"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Categoria"
              placeholder="Ex: mercado"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="image_url"
          render={({ field: { onChange, value } }) => (
            <Input
              label="URL da imagem"
              placeholder="https://..."
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Button
          title={editingItem ? "Atualizar promoção" : "Salvar promoção"}
          onPress={handleSubmit(onSubmit)}
          loading={loading}
        />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
  },

  imagePicker: {
    height: 160,
    borderRadius: 16,
    backgroundColor: "#1E293B",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },
});
