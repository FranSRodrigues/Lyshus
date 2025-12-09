import { useState } from "react";
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, Alert } from "react-native";
import FloatingInput from "@components/input";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import CaixaLocais from "@components/caixaLocais";
import { advanceAnimationByFrame } from "react-native-reanimated";

export default function Hoteis() {
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
            nome: 'Pousada Sol Nascente',
            endereco: 'Av. Olindo de Miranda, 700 - Almenara, MG, 39900-000',
            imagem: 'https://lh3.googleusercontent.com/p/AF1QipPmF8uxGps7NwA_PjMUga0HGzBjyHI3NeWeRh-W=s1360-w1360-h1020-rw',
            estrelas: 4.0,
            cor: '#FFD665',
            avaliacoes: 609,
        },
        {
            id: 2,
            nome: 'Pousada Onhas do Jequi',
            endereco: 'R. Argemiro Aguilar, 378 - Centro, Almenara - MG, 39900-000',
            imagem: 'https://lh3.googleusercontent.com/p/AF1QipMHkOSOGFSH0HCsmp8Pxvcuu30TY0ukdldMMhjD=w574-h384-n-k-rw-no-v1',
            estrelas: 4.4,
            cor: '#FFD665',
            avaliacoes: 117,
        },
        {
            id: 3,
            nome: 'Pousada Encantado',
            endereco: 'R. Benvindo Saúde, 23 - São Judas Tadeu, Almenara - MG, 39900-000',
            imagem: 'https://lh3.googleusercontent.com/p/AF1QipPz8d7szXFmS2CFUsE1Y-p5AG3RyyRm-RKtvG-v=w324-h312-n-k-no',
            estrelas: 4.2,
            cor: '#FFD665',
            avaliacoes: 74,
        },
        {
            id: 4,
            nome: 'Pousada Souza',
            endereco: 'R. Hermano Souza, 63 - Almenara, MG, 39900-000',
            imagem: 'https://lh3.googleusercontent.com/p/AF1QipOfxLBf34Hx5Cxoyg4foWVLChDTR2JQYlNCiSPc=s1360-w1360-h1020-rw',
            estrelas: 3.7,
            cor: '#FFD665',
            avaliacoes: 39,
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
                        <Text style={styles.titulo}>Hoteis</Text>
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
            backgroundColor: "#FFD665",
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
