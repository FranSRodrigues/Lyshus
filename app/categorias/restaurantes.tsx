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
            nome: 'Supermercado Sacolão',
            categoria: 'Supermercado',
            imagem: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxHMWDyH43D04Wqs-URFR0jTbq9thSnEpbEhwt-_qiLNFgT34szJ5P5Ib7wU8TuChYxTiueHgIiLld1b7B21QOuiMplryJ01B2lzaPLiGrS_hd2mI07fY1ALe7S5-WIXBzRaUE=s1360-w1360-h1020-rw',
            estrelas: 3.1,
            cor: '#FF5151',
        },
        {
            id: 2,
            nome: 'Salão do Reino',
            categoria: 'Igreja',
            imagem: 'https://redepara.com.br/imagens/galeria/118801/thumbs/22b76cf0081c4cf791cd2e8a11c3b496.png',
            estrelas: 4.9,
            cor: '#FF5151',
        },
        {
            id: 3,
            nome: 'Mineirão Atacarejo',
            categoria: 'Supermercado',
            imagem: 'https://cdn.samaisvarejo.com.br/portal/image/1714414600525-mineirao-atacarejo.jpeg',
            estrelas: 4.2,
            cor: '#FF5151',
        },
        {
            id: 4,
            nome: 'Country Rock Bar',
            categoria: 'Restaurante',
            imagem: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxTUuYGkX4-Df8YTGv4P68njbZEW5u07VDeinqBeQTfRpttBuhxlABS62ppkhL3TwgH6Yxnx_ZdXuesuvhXYUeHqdHkYHDO2IGMgA2nhGDCt_OKzOXE05rdPZz7Jsn-UxohdDv4=s1360-w1360-h1020-rw',
            estrelas: 3.9,
            cor: '#FF5151',
        },
    ];
    return (
        <>
            <ScrollView style={styles.conteiner} >

                <View style={styles.cabecalho}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={styles.titulo}>Restaurantes</Text>

                </View>


                <View style={{ paddingVertical: 20, gap: 20, alignItems: "center" }}>
                    {lugares.map((lugar) => (
                        <CaixaLocais
                            key={lugar.id}
                            nome={lugar.nome}
                            endereco={lugar.categoria}
                            avaliacao={lugar.estrelas}
                            avaliacoes={Math.floor(Math.random() * 100)}
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
        CaixaLocais:{
            backgroundColor: '#FF5757',
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
            backgroundColor: "#FF5757",
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
