import { useState } from "react";
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import CaixaLocais from "@components/caixaLocais";


export default function Restaurantes() {
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
            nome: 'Restaurante O Gauchão',
            endereco: 'Av. Olindo de Miranda, 650 - Centro, Almenara - MG, 39900-000',
            imagem: "https://lh3.googleusercontent.com/p/AF1QipNALn9S7NTqHisrM-Fjc-3mLZ5UdtrSWxxaTEvS=s1360-w1360-h1020-rw",
            estrelas: 4.3,
            cor: '#FF5151',
            avaliacoes: 459,
        },
        {
            id: 2,
            nome: 'Churrascaria Parada Mineira',
            endereco: 'Rod.Joel Mares, Cidade Nova, Almenara - MG, 39900-000',
            imagem: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSw2cG_G91otDnrfOasGyLCc-i31eeAIgkhrqStey35DwupbjqrVzuw4WB2ZlxU-kWHsNBSOaOwWRImJvw7T6HdfRROvG9OVyCRt6TUAxG5C2dAOklQwzym5okQNHKLxHzIuNdtQJRkFzbw=s1360-w1360-h1020-rw',
            estrelas: 4.1,
            cor: '#FF5151',
            avaliacoes: 759,
        },
        {
            id: 3,
            nome: 'Churrascaria Louro Lora',
            endereco: 'R. Pref. Roberto Martins Magno, 195 - Almenara, MG, 39900-000',
            imagem: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwsuvBUNbQ99FAqwSRqH0POafRadkIyFB-7GjEnEeuhPHOIoRF9q9KXb4K2VV2CqEg6PvAiVjjUuBQbnhdPsng_74ejpGnEHwJ-sJWbHfjegO3KtSHDAs2C1XIwoUZWnV-7xpw=s1360-w1360-h1020-rw',
            estrelas: 4.5,
            cor: '#FF5151',
            avaliacoes: 37,
        },
        {
            id: 4,
            nome: 'Restaurante Cheia de Graças',
            endereco: 'R. Argemiro Aguilar, 738 - Centro, Almenara - MG, 39900-000',
            imagem: 'https://lh3.googleusercontent.com/p/AF1QipOueCyvg8aoiRFzLK5OV6oOmYsa8dXaT3rCrCzG=s1360-w1360-h1020-rw' ,
            estrelas: 4.4,
            cor: '#FF5151',
            avaliacoes: 479,
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
                        <Text style={styles.titulo}>Restaurantes</Text>
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
            backgroundColor: "#FF5757",
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
