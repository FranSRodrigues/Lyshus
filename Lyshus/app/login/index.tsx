import { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import FloatingInput from "@components/input";


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <View style={styles.conteiner}>
        <Text>Login</Text>
      </View>

      <View>
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

        <Button 
         title="Login"
         onPress={() => { }} 
         />
      </View>
    </>

  );
}

const styles = StyleSheet.create(
  {
    conteiner: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%'
    },


  }
)
