import React, { useState, useEffect } from 'react';
import CaixaLocais from "@components/caixaLocais";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [userName, setUserName] = useState('User');

  const router = useRouter();

  useEffect(
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

  const lugares = [
    {
      id: 1,
      nome: 'Supermercado Sacolão',
      endereco: 'R. Hermano Souza, 246 - Centro, Almenara - MG',
      imagem: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxHMWDyH43D04Wqs-URFR0jTbq9thSnEpbEhwt-_qiLNFgT34szJ5P5Ib7wU8TuChYxTiueHgIiLld1b7B21QOuiMplryJ01B2lzaPLiGrS_hd2mI07fY1ALe7S5-WIXBzRaUE=s1360-w1360-h1020-rw',
      estrelas: 4.1,
      cor: '#00b312ff',
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
      cor: '#00b312ff',
      avaliacoes: 1106,
    },
    {
      id: 4,
      nome: 'Country Rock Bar',
      endereco: 'Tv. Liberdade, 25 - Centro, Almenara - MG',
      imagem: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxTUuYGkX4-Df8YTGv4P68njbZEW5u07VDeinqBeQTfRpttBuhxlABS62ppkhL3TwgH6Yxnx_ZdXuesuvhXYUeHqdHkYHDO2IGMgA2nhGDCt_OKzOXE05rdPZz7Jsn-UxohdDv4=s1360-w1360-h1020-rw',
      estrelas: 4.6,
      cor: '#f69d45ff',
      avaliacoes: 173,
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

      {/* MENU */}
      {menuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/login/editarInfo')}
          >
            <Ionicons name="pencil-outline" size={18} color="#000" />
            <Text style={styles.menuText}>Editar informações</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={async () => {
              await AsyncStorage.multiRemove(['userEmail', 'userName', 'isLoggedIn']);
              router.replace('/login');
            }}
          >
            <Ionicons name="log-out-outline" size={18} color="#000" />
            <Text style={styles.menuText}>Sair da conta</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* BUSCA */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar Lugar"
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* CATEGORIAS */}
      <View style={styles.categoriesContainer}>
        <TouchableOpacity
          style={[styles.categoryButton, { backgroundColor: '#FF5151' }]}
          onPress={() => router.push('/categorias/restaurantes')}
        >
          <Ionicons name="restaurant-outline" size={24} color="#fff" />
          <Text style={styles.categoryText}>Restaurantes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.categoryButton, { backgroundColor: '#f35810ff' }]}
          onPress={() => router.push('/categorias/hoteis')}
        >
          <Ionicons name="bed-outline" size={24} color="#fff" />
          <Text style={styles.categoryText}>Hoteis</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.categoryButton, { backgroundColor: '#00b312ff' }]}
          onPress={() => router.push('/categorias/supermercados')}
        >
          <Ionicons name="cart-outline" size={24} color="#fff" />
          <Text style={styles.categoryText}>Supermercados</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categoriesContainer}>
        <TouchableOpacity
          style={[styles.categoryButton, { backgroundColor: '#f69d45ff' }]}
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

      {/* LISTA */}
      <Text style={styles.sectionTitle}>Lugares Recomendados</Text>

      <View style={{ paddingVertical: 20, alignItems: "center" }}>
        {lugares.map((lugar) => (
          <CaixaLocais
            key={lugar.id}
            nome={lugar.nome}
            endereco={lugar.endereco}
            imageUrl={lugar.imagem}
            cor={lugar.cor}
          />
        ))}
      </View>

      <View style={{ height: 60 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  header: { width: "100%", height: 180, backgroundColor: "#AE77EA", paddingVertical: 40, paddingHorizontal: 20, borderRadius: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 40, fontWeight: "700", color: "#FFFFFF", marginBottom: 8 },
  headerSubtitle: { fontSize: 12, color: "rgba(255, 255, 255, 0.7)" },
  menu: { backgroundColor: '#fff', marginHorizontal: 20, marginTop: -10, borderRadius: 10, paddingVertical: 10, elevation: 2 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 15 },
  menuText: { marginLeft: 8, fontSize: 15, color: '#333' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 20, marginTop: 15, borderRadius: 10, paddingHorizontal: 10, height: 45, elevation: 1 },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16, color: '#333' },
  categoriesContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 30, marginHorizontal: 30 },
  categoryButton: { flex: 1, alignItems: 'center', marginHorizontal: 5, paddingVertical: 15, borderRadius: 12, elevation: 2, height: 90 },
  categoryText: { color: '#fff', fontWeight: '600', marginTop: 5 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginHorizontal: 20, marginTop: 30, marginBottom: 10, color: '#333' },
});