import React, { useState, useEffect } from 'react';
import CaixaLocais from "@components/caixaLocais";
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
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [userName, setUserName] = useState('User');

  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      const loadUserName = async () => {
        try {
          const savedName = await AsyncStorage.getItem('userName');
          if (savedName) {
            setUserName(savedName);
          }
        } catch (error) {
          console.error('Erro ao carregar nome do usuário:', error);
        }
      };
      loadUserName();
    }, [])
  );

  const handleCategoryPress = (name: string) => {
    alert(`Você clicou em ${name}!`);
  };

  const lugares = [
    {
      id: 1,
      nome: 'Supermercado Sacolão',
      categoria: 'Supermercados',
      imagem: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxHMWDyH43D04Wqs-URFR0jTbq9thSnEpbEhwt-_qiLNFgT34szJ5P5Ib7wU8TuChYxTiueHgIiLld1b7B21QOuiMplryJ01B2lzaPLiGrS_hd2mI07fY1ALe7S5-WIXBzRaUE=s1360-w1360-h1020-rw',
      estrelas: 3.1,
      cor: '#6AEE77',
    },
    {
      id: 2,
      nome: 'Doçura',
      categoria: 'Sorveterias',
      imagem: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/ec/42/ab/sorveteria-docura.jpg?w=500&h=-1&s=1',
      estrelas: 4.9,
      cor: '#619FF0',
    },
    {
      id: 3,
      nome: 'Mineirão Atacarejo',
      categoria: 'Supermercado',
      imagem: 'https://cdn.samaisvarejo.com.br/portal/image/1714414600525-mineirao-atacarejo.jpeg',
      estrelas: 4.2,
      cor: '#6AEE77',
    },
    {
      id: 4,
      nome: 'Country Rock Bar',
      categoria: 'Bares',
      imagem: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxTUuYGkX4-Df8YTGv4P68njbZEW5u07VDeinqBeQTfRpttBuhxlABS62ppkhL3TwgH6Yxnx_ZdXuesuvhXYUeHqdHkYHDO2IGMgA2nhGDCt_OKzOXE05rdPZz7Jsn-UxohdDv4=s1360-w1360-h1020-rw',
      estrelas: 3.9,
      cor: '#F2B579',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>Olá, {userName}!</Text>
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
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/login/editarInfo')}>
            <Ionicons name="pencil-outline" size={18} color="#000" />
            <Text style={styles.menuText}>Editar informações</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={async () => {
            await AsyncStorage.multiRemove(['userEmail', 'userName', 'isLoggedIn']);
            router.replace('/login');
          }}>
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
          onPress={() => router.push('/categorias/restaurantes')}
        >
          <Ionicons name="restaurant-outline" size={24} color="#fff" />
          <Text style={styles.categoryText}>Restaurantes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.categoryButton, { backgroundColor: '#FFD665' }]}
          onPress={() => router.push('/categorias/hoteis')}
        >
          <Ionicons name="restaurant-outline" size={24} color="#fff" />
          <Text style={styles.categoryText}>Hoteis</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.categoryButton, { backgroundColor: '#6AEE77' }]}
          onPress={() => router.push('/categorias/supermecardos')}
        >
          <Ionicons name="restaurant-outline" size={24} color="#fff" />
          <Text style={styles.categoryText}>Supermercados</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.categoryButton, { backgroundColor: '#F2B579' }]}
          onPress={() => router.push('/categorias/bares')}
        >
          <Ionicons name="beer-outline" size={24} color="#fff" />
          <Text style={styles.categoryText}>Bares</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.categoryButton, { backgroundColor: '#619FF0' }]}
          onPress={() => router.push('/categorias/sorveterias')}
        >
          <Ionicons name="ice-cream-outline" size={24} color="#fff" />
          <Text style={styles.categoryText}>Sorveterias</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Lugares Recomendados</Text>

      <View style={{ paddingVertical: 20, gap: 20, alignItems: "center" }}>
        {lugares.map((lugar) => (
        <CaixaLocais
        key={lugar.id}
        nome={lugar.nome}
        endereco={lugar.categoria}
        imageUrl={
      lugar.imagem ||
      "https://via.placeholder.com/400x200.png?text=Sem+Imagem"
    }
    cor={lugar.cor}
  />
))}

      </View>


      <View style={{ height: 60 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    width: "100%",
    height: 180,
    backgroundColor: "#AE77EA",
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
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