import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  nome: string;
  endereco: string;
  avaliacao: number;
  avaliacoes: number;
  imageUrl: string;
  onPress: () => void;
}

export default function CaixaLocais({ nome, endereco, avaliacao, avaliacoes, imageUrl, onPress }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{nome}</Text>
        <Text style={styles.cardSubtitle}>{endereco}</Text>
        <View style={styles.starRow}>
          <Text style={styles.avaliacaoText}>{avaliacao.toFixed(1)} ★</Text>
          <Text style={styles.avaliacoesText}>{avaliacoes} avaliações</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.avaliarButton} onPress={onPress}>
        <Text style={styles.avaliarButtonText}>Avaliar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '90%',
    backgroundColor: '#B24BF3',
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
    color: '#222',
    marginBottom: 4,
  },
  cardSubtitle: {
    color: '#000000',
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
    backgroundColor: '#4a4a4a',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 12,
    marginBottom: 12,
    alignSelf: 'flex-end',
  },
  avaliarButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});