import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { useForm, Controller } from "react-hook-form";
import { useContext, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { AuthContext } from "../../contexts/AuthContext";
import { createPromotion, updatePromotion } from "../../services/promotions";

import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

import { uploadImage } from "../../services/storage";

type FormData = {
  title: string;
  price: string;
  store: string;
  category: string;
};

export default function CreatePromotionScreen({ navigation }: any) {
  const { user } = useContext(AuthContext);
  const route = useRoute<any>();
  const editingItem = route.params?.item;

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [image, setImage] = useState<string | null>(
    editingItem?.image_url || null
  );

  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      title: editingItem?.title || "",
      price: editingItem?.price?.toString() || "",
      store: editingItem?.store || "",
      category: editingItem?.category || "",
    },
  });

  // =========================
  // 📸 PICK IMAGE + COMPRESS
  // =========================
  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];

      // 🔥 compressão
      const compressed = await ImageManipulator.manipulateAsync(
        asset.uri,
        [{ resize: { width: 800 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );

      setImage(compressed.uri);
    }
  }

  // =========================
  // 🚀 SUBMIT
  // =========================
  async function onSubmit(data: FormData) {
    try {
      setLoading(true);

      let imageUrl = null;

      if (image) {
        setUploading(true);

        // 🔥 fake progress (UX top)
        const interval = setInterval(() => {
          setProgress((prev) => (prev < 90 ? prev + 10 : prev));
        }, 200);

        imageUrl = await uploadImage(image, user.id);

        clearInterval(interval);
        setProgress(100);
      }

      if (editingItem) {
        await updatePromotion(editingItem.id, {
          ...data,
          price: Number(data.price),
          image_url: imageUrl,
        });
      } else {
        await createPromotion(
          {
            ...data,
            price: Number(data.price),
            image_url: imageUrl,
          },
          user.id
        );
      }

      Alert.alert("Sucesso", "Promoção salva!");

      reset();
      setImage(null);
      setProgress(0);

      navigation.goBack();

    } catch (error: any) {
      console.log("ERRO AO SALVAR:", error);
      Alert.alert("Erro", error.message);
    } finally {
      setLoading(false);
      setUploading(false);
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

        {/* 📸 IMAGEM */}
        <TouchableOpacity onPress={pickImage}>
          <ImageBackground
            source={{
              uri:
                image ||
                "https://via.placeholder.com/300x200.png?text=Selecionar+Imagem",
            }}
            style={styles.image}
            imageStyle={{ borderRadius: 16 }}
          >
            {!image && (
              <Text style={styles.imageText}>📸 Selecionar imagem</Text>
            )}
          </ImageBackground>
        </TouchableOpacity>

        {/* 📊 PROGRESS BAR */}
        {uploading && (
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${progress}%` }]} />
          </View>
        )}

        {/* FORM */}
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <Input label="Título" value={value} onChangeText={onChange} />
          )}
        />

        <Controller
          control={control}
          name="price"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Preço"
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
            <Input label="Loja" value={value} onChangeText={onChange} />
          )}
        />

        <Controller
          control={control}
          name="category"
          render={({ field: { onChange, value } }) => (
            <Input label="Categoria" value={value} onChangeText={onChange} />
          )}
        />

        <Button
          title={uploading ? "Enviando..." : "Salvar promoção"}
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          disabled={uploading}
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

  image: {
    height: 180,
    borderRadius: 16,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  imageText: {
    color: "#fff",
    fontWeight: "bold",
  },

  progressBar: {
    height: 6,
    backgroundColor: "#1E293B",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },

  progress: {
    height: "100%",
    backgroundColor: "#22C55E",
  },
});