import { useState } from "react";
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity } from "react-native";
import FloatingInput from "@components/input";
import { ButtonRoxo } from "@components/buttonLogin";
import { useRouter } from "expo-router";


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = () => {
    setLoading(true);
    // Simulate a login process
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }
  return (
    <>
      <ScrollView style={styles.conteiner}>

        <View style={styles.cabecalho}>
          <Text style={styles.titulo}>Login</Text>
          <Text style={styles.subtitulo}>Aproveite o nosso aplicativo!!</Text>
        </View>

        <View style={styles.mainContainer}>

          <View style={styles.formulario}>
            <FloatingInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <FloatingInput
              placeholder='Senha'
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              secureTextEntry={true}
            />
          </View>

          <TouchableOpacity style={styles.esqueciSenhaContainer}>
            <Text style={styles.esqueciSenha}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <View style={styles.conteiner2}>
            <ButtonRoxo title={loading ? 'Carregando...' : 'Login'} onPress={handleLogin} />
          </View>
          <View style={styles.cadastroContainer}>
            <Text style={styles.textoCadastro}>Não tem uma conta?</Text>
            <TouchableOpacity onPress={() => router.push("/login/cadastro")}>
              <Text style={styles.linkCadastro}> Clique aqui e cadastre</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>

  );
}

const styles = StyleSheet.create(
  {
    conteiner: {
      flex: 1,
      backgroundColor: "#F5F5F5",
    },
    mainContainer: {
      flex: 1,
      justifyContent: "center", // Centraliza verticalmente
      alignItems: "center", // Centraliza horizontalmente
      paddingHorizontal: 20,
      backgroundColor: "#F5F5F5",
    },
    cabecalho: {
      width: "100%",
      height: 180,
      alignItems: "center",
      backgroundColor: "#AE77EA",
      paddingVertical: 40,
      paddingHorizontal: 20,
      borderRadius: 20,
    },
    titulo: {
      fontSize: 40,
      fontWeight: "700",
      color: "#FFFFFF",
      marginBottom: 8,
    },
    subtitulo: {
      fontSize: 12,
      color: "rgba(255, 255, 255, 0.7)",
    },
    formulario: {
      marginTop: 40,
      paddingHorizontal: 20,
      paddingTop: 40,
    },
    conteiner2: {
      justifyContent: "center",
      marginTop: 20,
      marginHorizontal: 20,
    },
    esqueciSenhaContainer: {
      alignSelf: "flex-start", // Mantém no canto esquerdo
      marginTop: 8,
      marginLeft: 250,
    },
    esqueciSenha: {
      fontSize: 13,
      color: "#AE77EA",
      textDecorationLine: "underline",
    },
    cadastroContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 20,
    },
    textoCadastro: {
      fontSize: 14,
      color: "#666",
    },
    linkCadastro: {
      fontSize: 14,
      color: "#AE77EA",
      fontWeight: "600",
      textDecorationLine: "underline",
    },
  }
)
