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
            nome: 'Soverteria Amigo',
            endereco: 'Av. Olindo de Miranda - Almenara, MG, 39900-000',
            imagem: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzgHPVQ_zPS9T6O4SFlK_L7v7FDVBdeN8MXjFu6c25LoTqzgqa4GKZRezzA_QyHh4w4seNNT9ryAYuEZWVyRHECh4agpD5ELvu98OFyBRmHTmg46eE8MP_kdNSqMSsTgFPDm9PQCQ=s1360-w1360-h1020-rw',
            estrelas: 4.5,
            cor: '#619FF0',
            avaliacoes: 109,
        },
        {
            id: 2,
            nome: 'Doçura',
            endereco: 'R. Antônio Gil, 1-39 - Almenara, MG, 39900-000',
            imagem: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/ec/42/ab/sorveteria-docura.jpg?w=500&h=-1&s=1',
            estrelas: 4.7,
            cor: '#619FF0',
            avaliacoes: 483,
        },
        {
            id: 3,
            nome: 'Aeroaçaí',
            endereco: 'Avenida Aeroporto, 2 - A Definir, Almenara - MG, 39900-000',
            imagem: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzgSskJDWuziOjvGeOihFXzcJJcB16P15I8X7Qo6uIQnV34PZiFUzxFge0ibNgWH0rT5UJVOZwbNlO5I344uh58SLhg_85ZPggXRlIEk2_iAeL8mpyQmQ0LcOP6vqQ5GV7qHusJ=s1360-w1360-h1020-rw',
            estrelas: 4.6,
            cor: '#619FF0',
            avaliacoes: 50,
        },
        {
            id: 4,
            nome: 'Mr SHAKE',
            endereco: 'R. Bias Fortes, 372 - lj 1 - Almenara, MG, 39900-000',
            imagem: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSx84ND-v6q3Z_66MDwggeBnfFi_HzyXDDxhm9Ml6JRkf7-T_iyRN5kIwqYIbs5_gdfLLXPc-FBd2ehAlzJ3E0SbC7FHNvxie74da8pv4yicUbMSI3mIy-MKbEyuHZveqy5PMvmf=s1360-w1360-h1020-rw',
            estrelas: 4.6,
            cor: '#619FF0',
            avaliacoes: 25,
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
                        <Text style={styles.titulo}>Sorveterias</Text>
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
            backgroundColor: "#619FF0",
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
