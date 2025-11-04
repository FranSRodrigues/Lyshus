import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [search, setSearch] = useState('');

  const handleCategoryPress = (name: string) => {
    alert(`Você clicou em ${name}!`);
  };

  const lugares = [
    {
      id: 1,
      nome: 'Supermercado Sacolão',
      categoria: 'Supermercado',
      imagem: '',
      estrelas: 3.1,
    },
    {
      id: 2,
      nome: 'Salão do Reino',
      categoria: 'Igreja',
      imagem: 'https://redepara.com.br/imagens/galeria/118801/thumbs/22b76cf0081c4cf791cd2e8a11c3b496.png',
      estrelas: 4.9,
    },
    {
      id: 3,
      nome: 'Mineirão Atacarejo',
      categoria: 'Supermercado',
      imagem: 'hhttps://jornaldosudoeste.com.br/admin/assets/images/noticias/2025-03/67d8281f22c7a.webp',
      estrelas: 4.2,
    },
    {
      id: 4,
      nome: 'Country Rock Bar',
      categoria: 'Restaurante',
      imagem: 'https://images.unsplash.com/photo-1625943555417-92cb5d97e8df?w=800',
      estrelas: 3.9,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>Hi, User!</Text>
            <Text style={styles.headerSubtitle}>lyshus</Text>
          </View>

          <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
            <Ionicons name="settings-outline" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* MENU DE OPÇÕES */}
      {menuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="pencil-outline" size={18} color="#000" />
            <Text style={styles.menuText}>Editar informações</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="log-out-outline" size={18} color="#000" />
            <Text style={styles.menuText}>Sair da conta</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* CAMPO DE BUSCA */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color="#999"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar Lugar"
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={styles.categoriesContainer}>
        <TouchableOpacity
          style={[styles.categoryButton, { backgroundColor: '#FF5151' }]}
          onPress={() => handleCategoryPress('Restaurantes')}
        >
          <Ionicons name="restaurant-outline" size={24} color="#fff" />
          <Text style={styles.categoryText}>Restaurantes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.categoryButton, { backgroundColor: '#F2B579' }]}
          onPress={() => handleCategoryPress('Bares')}
        >
          <Ionicons name="beer-outline" size={24} color="#fff" />
          <Text style={styles.categoryText}>Bares</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.categoryButton, { backgroundColor: '#619FF0' }]}
          onPress={() => handleCategoryPress('Sorveterias')}
        >
          <Ionicons name="ice-cream-outline" size={24} color="#fff" />
          <Text style={styles.categoryText}>Sorveterias</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Lugares Recomendados</Text>

      {lugares.map((lugar) => (
        <View key={lugar.id} style={styles.card}>
          <Image source={{ uri: lugar.imagem }} style={styles.cardImage} />
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{lugar.nome}</Text>
            <Text style={styles.cardSubtitle}>{lugar.categoria}</Text>
            <View style={styles.starRow}>
              <Ionicons name="star" size={16} color="#FBBF24" />
              <Text style={styles.starText}>{lugar.estrelas.toFixed(1)}</Text>
            </View>
          </View>
        </View>
      ))}

      <View style={{ height: 60 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: 40,
  },
  header: {
    backgroundColor: '#A78BFA',
    padding: 40,
    paddingTop: 80,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: '#fff',
    opacity: 0.9,
    fontSize: 14,
  },
  menu: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: -10,
    borderRadius: 10,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  menuText: {
    marginLeft: 8,
    fontSize: 15,
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 45,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    marginHorizontal: 30,
    gap: 10
  },
  categoryButton: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
    paddingVertical: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
    height: 90,
  },
  categoryText: {
    color: '#fff',
    fontWeight: '600',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 10,
    color: '#333',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 30,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  cardImage: {
    width: 90,
    height: 90,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  cardInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  cardSubtitle: {
    color: '#666',
    fontSize: 13,
    marginTop: 2,
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  starText: {
    marginLeft: 4,
    color: '#333',
    fontSize: 13,
  },
});