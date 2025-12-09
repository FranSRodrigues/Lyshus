import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function AvaliarScreen() {
  const router = useRouter();
  const { nome } = useLocalSearchParams(); // Recebe o nome do local

  const [rating, setRating] = useState(0);
  const [comentario, setComentario] = useState("");

  const salvarAvaliacao = async () => {
    try {
      const chave = `avaliacao_${nome}`;

      // Busca avaliações existentes
      const existente = await AsyncStorage.getItem(chave);

      let data = {
        media: rating,
        quantidade: 1,
        comentarios: comentario ? [comentario] : [],
      };

      if (existente) {
        const obj = JSON.parse(existente);
        const novaQuantidade = obj.quantidade + 1;
        const novaMedia = (obj.media * obj.quantidade + rating) / novaQuantidade;
        const comentariosExistentes = Array.isArray(obj.comentarios) ? obj.comentarios : [];

        data = {
          media: novaMedia,
          quantidade: novaQuantidade,
          comentarios: comentario
            ? [...comentariosExistentes, comentario]
            : comentariosExistentes,
        };
      }

      await AsyncStorage.setItem(chave, JSON.stringify(data));
      alert("Avaliação registrada!");

      // Verifica se o usuário está logado
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (isLoggedIn === "true") {
        router.replace("/"); // Vai para index.tsx
      } else {
        Alert.alert("Não autenticado", "Você precisa estar logado para acessar a página inicial.");
        router.replace("/login"); // Redireciona para login
      }
    } catch (error) {
      console.log("Erro ao salvar avaliação:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Avaliar {nome}</Text>

      <Text style={styles.subtitle}>Selecione sua nota:</Text>

      <View style={styles.starRow}>
        {[1, 2, 3, 4, 5].map((n) => (
          <TouchableOpacity key={n} onPress={() => setRating(n)}>
            <Text style={[styles.star, rating >= n && styles.starSelected]}>★</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Escreva um comentário (opcional)"
        value={comentario}
        onChangeText={setComentario}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        placeholderTextColor="#888"
      />

      <TouchableOpacity
        style={[styles.button, rating === 0 && styles.buttonDisabled]}
        onPress={salvarAvaliacao}
        disabled={rating === 0}
      >
        <Text style={styles.buttonText}>Enviar Avaliação</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF", padding: 20, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20 },
  subtitle: { fontSize: 18, marginBottom: 10 },
  starRow: { flexDirection: "row", marginVertical: 20 },
  star: { fontSize: 38, marginHorizontal: 10, color: "#CCC" },
  starSelected: { color: "#FFD700", textShadowColor: "#000", textShadowRadius: 4 },
  input: { width: "100%", borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8, height: 120, backgroundColor: "#fff", marginBottom: 20 },
  button: { backgroundColor: "#6AEE77", paddingVertical: 12, paddingHorizontal: 30, borderRadius: 12 },
  buttonDisabled: { backgroundColor: "#9ad7a6" },
  buttonText: { color: "#FFF", fontWeight: "700", fontSize: 16 },
});