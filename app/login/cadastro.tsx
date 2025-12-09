import { useState } from "react";
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, Alert } from "react-native";
import FloatingInput from "@components/input";
import { ButtonRoxo } from "@components/buttonLogin";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleRegister = async () => {
        if (!email.trim() || !password.trim() || !name.trim()) {
            Alert.alert('Atenção', 'Por favor preencha todos os campos.');
            return;
        }

        // Validação: email deve ser @gmail.com
        if (!email.endsWith('@gmail.com')) {
            Alert.alert('Email inválido', 'Por favor use um email @gmail.com');
            return;
        }
        setLoading(true)

        setTimeout(async () => {
            try {
                // Salvar dados no AsyncStorage
                await AsyncStorage.multiSet([
                    ['userEmail', email],
                    ['userName', name],
                    ['isLoggedIn', 'true']
                ]);
                
                setLoading(false)
                router.push('/login')
            } catch (error) {
                console.error('Erro ao salvar dados:', error);
                setLoading(false)
                Alert.alert('Erro', 'Não foi possível salvar os dados.')
            }
        }, 1500)
    }
    return (
        <>
            <ScrollView style={styles.conteiner} >

                <View style={styles.cabecalho}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.arrowContainer}>
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <View style={styles.textoContainer}>
                        <Text style={styles.titulo}>Cadastro</Text>
                        <Text style={styles.subtitulo}>Aproveite o nosso aplicativo!!</Text>
                    </View>
                </View>

                <View style={styles.mainContainer}>

                    <View style={styles.formulario}>

                        <FloatingInput
                            placeholder="Nome"
                            value={name}
                            onChangeText={setName}
                            autoCapitalize="words" />

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

                    <ButtonRoxo title={loading ? "Cadastrando..." : "Cadastre-se"} onPress={handleRegister} />
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
            justifyContent: "center", 
            alignItems: "center", 
            paddingHorizontal: 20,
            backgroundColor: "#F5F5F5",
        },
        cabecalho: {
            width: "100%",
            height: 180,
            backgroundColor: "#AE77EA",
            paddingVertical: 40,
            paddingHorizontal: 20,
            borderRadius: 20,
            flexDirection: "row",
            alignItems: "flex-start",
        },
        arrowContainer: {
            paddingRight: 10,
            paddingTop: 5,
        },
        textoContainer: {
            flex: 1,
            alignItems: "center",
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
            paddingHorizontal: 20,
            paddingTop: 40,
        },
        cadastrar: {
            marginTop: 40,
            marginHorizontal: 20,
        },

    }
)
