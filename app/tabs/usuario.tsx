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

      <View style={styles.textosCentrais}>
        <View style={styles.informacoes}>
          <View style={styles.icone}><Ionicons name="at-outline" size={20} color="white" /></View>
          <Text style={styles.text}>usuario@gmail.com</Text>
        </View>
        <View style={styles.informacoes}>
          <View style={styles.icone}><Ionicons name="pencil-outline" size={20} color="white" /></View>
          <Text style={styles.text}>Avaliações:</Text>
        </View>
        <View style={styles.informacoes}>
          <View style={styles.icone}><Ionicons name="heart" size={20} color="white" /></View>
          <Text style={styles.text}>Favoritos:</Text>
        </View>
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
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 18,
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
  informacoes: {
    fontSize: 18,
    margin: 15,
    marginStart: 15,
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
    marginLeft: 20,
    color: 'black',
    marginTop: 10,
  },
  icone: {
    backgroundColor: '#AE77EA',
    borderRadius: 360,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textosCentrais: {
    marginTop: 15,
  }
});