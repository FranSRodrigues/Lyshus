import {ActivityIndicator, Text, View} from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

export default function App() {
    const router = useRouter();
    const [authenticated, setAutenticated] = useState(false);
    
    useEffect(() => {
        setAutenticated(false)
        if (authenticated) {
            router.navigate('/(tabs)');
        } else {
            router.navigate('/login');
        }
    }, [authenticated]);

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );

}
 