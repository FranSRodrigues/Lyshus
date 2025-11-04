import { ActivityIndicator, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

export default function App() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  
  useEffect(() => {
    const initialize = async () => {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setIsReady(true);
    };
    initialize();
  }, []);

  useEffect(() => {
    if (!isReady) return;

    if (authenticated) {
      router.replace('/(tabs)');
    } else {
      router.replace('/login');
    }
  }, [isReady, authenticated]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
