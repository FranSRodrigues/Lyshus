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
            endereco: 'R. Hermano Souza, 246 - Centro, Almenara - MG, 39900-000',
            imagem: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxHMWDyH43D04Wqs-URFR0jTbq9thSnEpbEhwt-_qiLNFgT34szJ5P5Ib7wU8TuChYxTiueHgIiLld1b7B21QOuiMplryJ01B2lzaPLiGrS_hd2mI07fY1ALe7S5-WIXBzRaUE=s1360-w1360-h1020-rw',
            estrelas: 4.1,
            cor: '#00b312ff',
            avaliacoes: 318,
        },
        {
            id: 2,
            nome: 'Supermercado Boa Compra',
            endereco: 'R. Argemiro Aguilar, 618 - Almenara, MG, 39900-000',
            imagem: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSz4RVDlgDfDU6WNlOSbaY5Wu9joTs9vAOtoBXjg2eOdeJRWjREdJDGLj2COo7pdtkpO1PekBgrvqgWD5D6HUJpP7FzfAvavy0Le7okJ0Jn0-luwAaMUwYU2SEPGOY-EfPwD0PfgRw=s1360-w1360-h1020-rw',
            estrelas: 4.2,
            cor: '#00b312ff',
            avaliacoes: 348,
        },
        {
            id: 3,
            nome: 'Mineirão Atacarejo',
            endereco: ' BR-367, KM113 , n°58 - A - Cidade Nova, Almenara - MG, 39900-000',
            imagem: 'https://cdn.samaisvarejo.com.br/portal/image/1714414600525-mineirao-atacarejo.jpeg',
            estrelas: 4.4,
            cor: '#00b312ff',
            avaliacoes: 1106,
        },
        {
            id: 4,
            nome: 'Xereta Supermercados',
            endereco: 'R. Severiano Coutinho, 275 - Centro, Almenara - MG, 39900-000',
            imagem: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxPzxe2ZLjVTfAZZLf_JBnWZed8dvPHsv0osV7XhJA6uxJVf3DR8V2AWYRhR4pqqwO0AJIbMsjmlszC0yJkMAOIY1e39F3celjPL-FALIl7htVUGAY3nxGcpWpCLnqKG-yYfEV7=s1360-w1360-h1020-rw',
            estrelas: 3.9,
            cor: '#00b312ff',
            avaliacoes: 672,
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
                        <Text style={styles.titulo}>Supermecardos</Text>
                    </View>
                </View>



                <View style={{ paddingVertical: 20, gap: 20, alignItems: "center" }}>
                    {lugares.map((lugar) => (
                        <CaixaLocais
                            key={lugar.id}
                            nome={lugar.nome}
                            endereco={lugar.endereco}
                            avaliacao={lugar.estrelas}
                            avaliacoes={lugar.avaliacoes}
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
            backgroundColor: "#00b312ff",
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
