import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  nome: string;
  endereco: string;
  imageUrl: string;
  cor?: string;
}

export default function CaixaLocais({
  nome,
  endereco,
  imageUrl,
  cor = '#AE77EA'
}: Props) {

  const router = useRouter();

  const [media, setMedia] = useState(0);
  const [quantidade, setQuantidade] = useState(0);

  // Carregar avaliações do AsyncStorage
  useEffect(() => {
    async function carregarAvaliacoes() {
      try {
        const data = await AsyncStorage.getItem("AVALIACOES");
        if (!data) return;

        const json = JSON.parse(data);
        const lista = json[nome] || [];

        if (lista.length > 0) {
          const avg = lista.reduce((a: number, b: number) => a + b, 0) / lista.length;
          setMedia(avg);
          setQuantidade(lista.length);
        }
      } catch (e) {
        console.log("Erro ao carregar avaliações:", e);
      }
    }

    carregarAvaliacoes();
  }, [nome]);

  const handleAvaliacao = () => {
    try {
      const safeNome = encodeURIComponent(String(nome));
      (router as any)?.push?.(`/avaliar?nome=${safeNome}`);
    } catch (error) {
      console.error("Erro ao navegar:", error);
    }
  };

  return (
    <View style={[styles.card, { backgroundColor: cor }]}>
      <Image source={{ uri: imageUrl }} style={styles.cardImage} resizeMode="cover" />

      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{nome}</Text>
        <Text style={styles.cardSubtitle}>{endereco}</Text>

        <View style={styles.starRow}>
          <Text style={styles.avaliacaoText}>★ {media.toFixed(1)}</Text>
          <Text style={styles.avaliacoesText}>{quantidade} avaliações</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.avaliarButton}
        onPress={handleAvaliacao}
      >
        <Text style={styles.avaliarButtonText}>Avaliar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '90%',
    backgroundColor: '#AE77EA',
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 8,
    elevation: 2,
    alignSelf: 'center',
  },
  cardImage: {
    marginTop: 12,
    borderRadius: 12,
    marginLeft: 28,
    width: '90%',
    height: 140,
  },
  cardInfo: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  cardSubtitle: {
    color: '#fff',
    fontSize: 13,
    marginBottom: 8,
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avaliacaoText: {
    fontWeight: '600',
    color: '#f3f046',
  },
  avaliacoesText: {
    marginLeft: 10,
    color: '#f3f046',
    fontSize: 13,
  },
  avaliarButton: {
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 12,
    marginBottom: 12,
    alignSelf: 'flex-end',
  },
  avaliarButtonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 14,
  },
});
