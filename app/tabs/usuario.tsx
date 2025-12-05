import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.parteSuperior}>
        <Text style={styles.textoSuperior}>
          <Ionicons name="person-outline" size={20} color="#fff"/>
          Usuário
          </Text>
      </View>
      <View style={styles.bolaBranca}>
          <View style={styles.imagemUsuario}>
              <Ionicons name="person-circle-outline" size={120} color="#B59AC4" />
          </View>
          <Text style={styles.textoCentral}>Usuário</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
  },
  parteSuperior: {
    backgroundColor: '#AE77EA',
    width: '100%',
    height: 150,
    borderBottomEndRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingLeft: 50,
    paddingBottom: 30,
  },
  textoSuperior: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    paddingLeft: 5,
  },
  textoCentral: {
    fontWeight: 'bold',
  },
  bolaBranca: {
    width: 280,
    height: 280,
    backgroundColor: '#D9D9D9',
    borderRadius: 140,
    justifyContent: 'flex-end',
    paddingBottom: 40,
    alignItems: 'center',
    marginTop: 60,
    borderWidth: 25,
    borderColor: 'white',
  },
  imagemUsuario: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
  },

});