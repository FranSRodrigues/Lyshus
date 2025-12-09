import { useState } from "react";
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, Alert } from "react-native";
import FloatingInput from "@components/input";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import CaixaLocais from "@components/caixaLocais";

export default function EditarInfo() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSaveInfo = () => {
        if (!email.trim() || !password.trim() || !name.trim()) {
            Alert.alert('Atenção', 'Por favor preencha os campos de email e senha.');
            return;
        }
        setLoading(true)
        // Aqui você adicionaria a lógica de cadastro
        setTimeout(() => {
            setLoading(false)
            router.push('/login')
        }, 1500)
    }
    const lugares = [
        {
            id: 1,
            nome: 'Varanda Do Espeto',
            endereco: 'R. Bias Fortes, 778 - Centro, Almenara - MG, 39900-000',
            imagem: 'https://lh3.googleusercontent.com/p/AF1QipPdOWKm9Wu0P-fxyUjDo46fAUfjKGXkShVtC0nF=s1360-w1360-h1020-rw',
            estrelas: 4.6,
            cor: '#F2B579',
            avaliacoes: 342,
        },
        {
            id: 2,
            nome: 'NOSSA CASA ESPETERIA E CIA',
            endereco: 'Av. Olindo de Miranda, 535 - CENTRO, Almenara - MG, 39900-000',
            imagem: 'https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=6d_OqxbfR5StXTiPYzgbNw&cb_client=search.gws-prod.gps&yaw=287.9493&pitch=0&thumbfov=100&w=325&h=218',
            estrelas: 4.7,
            cor: '#F2B579',
            avaliacoes: 18,
        },
        {
            id: 3,
            nome: 'Casa Blanca Happy Hour Bar',
            endereco: 'Av. Dr. Carmosino Ferreira Costa - Almenara, MG, 39900-000',
            imagem: 'https://lh3.googleusercontent.com/p/AF1QipPZofsrV_lpvSQ3Ykizdo-0KOHcfHgU-CF949xc=s1360-w1360-h1020-rw',
            estrelas: 4.6,
            cor: '#F2B579',
            avaliacoes: 8,
        },
        {
            id: 4,
            nome: 'Country Rock Bar',
            endereco: 'Tv. Liberdade, 25 - Centro, Almenara - MG, 39900-000',
            imagem: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxTUuYGkX4-Df8YTGv4P68njbZEW5u07VDeinqBeQTfRpttBuhxlABS62ppkhL3TwgH6Yxnx_ZdXuesuvhXYUeHqdHkYHDO2IGMgA2nhGDCt_OKzOXE05rdPZz7Jsn-UxohdDv4=s1360-w1360-h1020-rw',
            estrelas: 4.6,
            cor: '#F2B579',
            avaliacoes: 173,
        },
    ];
    return (
        <>
            <ScrollView style={styles.conteiner} >

                <View style={styles.cabecalho}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.arrowContainer}>
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <View style={styles.textoContainer}>
                        <Text style={styles.titulo}>Bares</Text>
                    </View>
                </View>
    
                <View style={{ paddingVertical: 20, gap: 20, alignItems: "center" }}>
                    {lugares.map((lugar) => (
                        <CaixaLocais
                            key={lugar.id}
                            nome={lugar.nome}
                            endereco={lugar.endereco}
                            avaliacao={lugar.estrelas}
                            avaliacoes={lugar.avaliacoes || 0}
                            imageUrl={
                                lugar.imagem ||
                                "https://via.placeholder.com/400x200.png?text=Sem+Imagem"
                            }
                            onPress={() => console.log(`Avaliar ${lugar.nome}`)}
                            cor={lugar.cor}
                        />
                    ))}
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
            backgroundColor: "#F2B579",
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
