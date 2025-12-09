import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, Alert } from "react-native";
import FloatingInput from "@components/input";
import { ButtonRoxo } from "@components/buttonLogin";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditarInfo() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        // Carregar dados salvos do AsyncStorage
        const loadUserData = async () => {
            try {
                const savedEmail = await AsyncStorage.getItem('userEmail');
                const savedName = await AsyncStorage.getItem('userName');
                if (savedEmail) setEmail(savedEmail);
                if (savedName) setName(savedName);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
        };
        loadUserData();
    }, []);

    const handleSaveInfo = async () => {
        // Validação: se preencheu email, deve ser @gmail.com
        if (email.trim() && !email.endsWith('@gmail.com')) {
            Alert.alert('Email inválido', 'Por favor use um email @gmail.com');
            return;
        }
        setLoading(true)
        // Aqui você adicionaria a lógica de atualização
        setTimeout(async () => {
            try {
                // Salvar dados atualizados no AsyncStorage
                await AsyncStorage.multiSet([
                    ['userEmail', email],
                    ['userName', name],
                ]);
                
                setLoading(false)
                Alert.alert('Sucesso', 'Informações salvas com sucesso!')
                router.back()
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
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={styles.titulo}>Editar Informações</Text>

                </View>

                <View style={styles.mainContainer}>

                    <View style={styles.formulario}>
                        <View style={styles.profileImageContainer}>
                            <TouchableOpacity style={styles.imageWrapper} >
                                <View style={styles.imagePlaceholder}>
                                    <MaterialCommunityIcons name="image-multiple" size={50} color="#999999" />
                                </View>
                                <View style={styles.cameraIcon}>
                                    <MaterialCommunityIcons name="camera" size={20} color="#FFFFFF" />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.fieldLabelRow}>
                            <MaterialCommunityIcons name="account" size={20} color="#666666" />
                            <Text style={styles.fieldLabel}>Nome:</Text>
                        </View>
                        <FloatingInput
                            placeholder="Nome"
                            value={name}
                            onChangeText={setName}
                            autoCapitalize="words" />

                        <View style={styles.fieldLabelRow}>
                            <MaterialCommunityIcons name="email" size={20} color="#666666" />
                            <Text style={styles.fieldLabel}>Email:</Text>
                        </View>
                        <FloatingInput
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        <View style={styles.fieldLabelRow}>
                            <MaterialCommunityIcons name="lock" size={20} color="#666666" />
                            <Text style={styles.fieldLabel}>Senha:</Text>
                        </View>
                        <FloatingInput
                            placeholder='Senha'
                            value={password}
                            onChangeText={setPassword}
                            autoCapitalize="none"
                            secureTextEntry={true}
                        />
                    </View>

                    <ButtonRoxo title={loading ? "Salvando Informações..." : "Salvar Informações"} onPress={handleSaveInfo} />
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create(
    {
        profileImageContainer: {
            alignItems: "center",
            marginVertical: 40,
        },
        imageWrapper: {
            position: "relative",
        },
        imagePlaceholder: {
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: "#E0E0E0",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 4,
            borderColor: "#999999",
        },
        cameraIcon: {
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: "#B24BF3",
            justifyContent: "center",
            alignItems: "center",
        },
        fieldLabelRow: {
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 12,
        },
        fieldLabel: {
            fontSize: 14,
            fontWeight: "600",
            color: "#333333",
            marginLeft: 8,
        },
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
            paddingHorizontal: 20,
            paddingTop: 40,
        },
        cadastrar: {
            marginTop: 40,
            marginHorizontal: 20,
        },

    }
)
