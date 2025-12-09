import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AvaliarScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const nome = decodeURIComponent(String(params.nome || ''));
  
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('Usuário');
  const [lugarInfo, setLugarInfo] = useState<any>(null);

  useEffect(() => {
    const loadUserName = async () => {
      try {
        const savedName = await AsyncStorage.getItem('userName');
        if (savedName) {
          setUserName(savedName);
        }
      } catch (error) {
        console.error('Erro ao carregar nome:', error);
      }
    };
    loadUserName();
  }, []);

  // Dados dos lugares (deve corresponder aos dados em app/tabs/index.tsx)
  const lugares = [
    {
      id: 1,
      nome: 'Supermercado Sacolão',
      endereco: 'R. Hermano Souza, 246 - Centro, Almenara - MG',
      imagem: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxHMWDyH43D04Wqs-URFR0jTbq9thSnEpbEhwt-_qiLNFgT34szJ5P5Ib7wU8TuChYxTiueHgIiLld1b7B21QOuiMplryJ01B2lzaPLiGrS_hd2mI07fY1ALe7S5-WIXBzRaUE=s1360-w1360-h1020-rw',
      estrelas: 4.1,
      cor: '#6AEE77',
      avaliacoes: 318,
    },
    {
      id: 2,
      nome: 'Doçura',
      endereco: 'R. Antônio Gil, 1-39 - Almenara - MG',
      imagem: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/ec/42/ab/sorveteria-docura.jpg?w=500&h=-1&s=1',
      estrelas: 4.7,
      cor: '#619FF0',
      avaliacoes: 483,
    },
    {
      id: 3,
      nome: 'Mineirão Atacarejo',
      endereco: 'BR-367, KM113, n°58 - Cidade Nova, Almenara - MG',
      imagem: 'https://cdn.samaisvarejo.com.br/portal/image/1714414600525-mineirao-atacarejo.jpeg',
      estrelas: 4.4,
      cor: '#6AEE77',
      avaliacoes: 1106,
    },
    {
      id: 4,
      nome: 'Country Rock Bar',
      endereco: 'Tv. Liberdade, 25 - Centro, Almenara - MG',
      imagem: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxTUuYGkX4-Df8YTGv4P68njbZEW5u07VDeinqBeQTfRpttBuhxlABS62ppkhL3TwgH6Yxnx_ZdXuesuvhXYUeHqdHkYHDO2IGMgA2nhGDCt_OKzOXE05rdPZz7Jsn-UxohdDv4=s1360-w1360-h1020-rw',
      estrelas: 4.6,
      cor: '#F2B579',
      avaliacoes: 173,
    },
  ];

  useEffect(() => {
    // Encontrar o lugar pelo nome
    const lugar = lugares.find(l => l.nome === nome);
    if (lugar) {
      setLugarInfo(lugar);
    }
  }, [nome]);

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert('Atenção', 'Por favor selecione uma avaliação de estrelas.');
      return;
    }

    try {
      // Recuperar avaliações existentes
      const data = await AsyncStorage.getItem('AVALIACOES');
      const avaliacoes = data ? JSON.parse(data) : {};

      // Adicionar nova avaliação
      if (!avaliacoes[nome]) {
        avaliacoes[nome] = [];
      }

      avaliacoes[nome].push(rating);

      // Salvar no AsyncStorage
      await AsyncStorage.setItem('AVALIACOES', JSON.stringify(avaliacoes));

      Alert.alert('Sucesso', 'Avaliação enviada com sucesso!');
      router.back();
    } catch (error) {
      console.error('Erro ao salvar avaliação:', error);
      Alert.alert('Erro', 'Não foi possível salvar a avaliação.');
    }
  };

  if (!lugarInfo) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={[styles.header, { backgroundColor: lugarInfo.cor }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Avaliar</Text>
        </View>
      </View>

      {/* LUGAR INFO CARD */}
      <View style={[styles.lugarCard, { backgroundColor: lugarInfo.cor }]}>
        <Image
          source={{ uri: lugarInfo.imagem }}
          style={styles.lugarImage}
          resizeMode="cover"
        />
        <View style={styles.lugarInfo}>
          <Text style={styles.lugarNome}>{lugarInfo.nome}</Text>
          <View style={styles.enderecoRow}>
            <Ionicons name="location" size={16} color="#FFF" />
            <Text style={styles.lugarEndereco}>{lugarInfo.endereco}</Text>
          </View>
          <View style={styles.avaliacaoRow}>
            <Text style={styles.lugarEstrelas}>★ {lugarInfo.estrelas.toFixed(1)}</Text>
            <Text style={styles.lugarAvaliacoes}>({lugarInfo.avaliacoes} avaliações)</Text>
          </View>
        </View>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        {/* USER INFO */}
        <View style={styles.userInfo}>
          <View style={styles.userAvatar}>
            <Ionicons name="person-circle-outline" size={50} color={lugarInfo.cor} />
          </View>
          <View>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.userTime}>Agora</Text>
          </View>
        </View>

        {/* STARS RATING */}
        <View style={styles.ratingSection}>
          <Text style={styles.ratingLabel}>Sua Avaliação:</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setRating(star)}
                style={styles.starButton}
              >
                <Text style={[styles.star, { color: star <= rating ? '#FFD665' : '#DDD' }]}>
                  ★
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.ratingValue}>
            {rating > 0 ? `${rating.toFixed(1)} de 5` : 'Toque para avaliar'}
          </Text>
        </View>

        {/* COMMENT */}
        <View style={styles.commentSection}>
          <Text style={styles.commentLabel}>Comentário (opcional):</Text>
          <TextInput
            style={styles.commentInput}
            placeholder="Compartilhe sua experiência..."
            placeholderTextColor="#999"
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* SUBMIT BUTTON */}
        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: lugarInfo.cor }]}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Enviar Avaliação</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    paddingRight: 15,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  lugarCard: {
    marginHorizontal: 20,
    marginVertical: 15,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
  },
  lugarImage: {
    width: '100%',
    height: 180,
  },
  lugarInfo: {
    padding: 15,
  },
  lugarNome: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 8,
  },
  enderecoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  lugarEndereco: {
    fontSize: 12,
    color: '#FFF',
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
  avaliacaoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lugarEstrelas: {
    fontWeight: '700',
    color: '#FFD665',
    marginRight: 8,
  },
  lugarAvaliacoes: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
  },
  userAvatar: {
    marginRight: 15,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  userTime: {
    fontSize: 12,
    color: '#999',
  },
  ratingSection: {
    backgroundColor: '#FFF',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  starButton: {
    marginHorizontal: 10,
    padding: 8,
  },
  star: {
    fontSize: 36,
  },
  ratingValue: {
    fontSize: 14,
    color: '#AE77EA',
    fontWeight: '600',
  },
  commentSection: {
    backgroundColor: '#FFF',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  commentLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    color: '#333',
    maxHeight: 100,
  },
  submitButton: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
});