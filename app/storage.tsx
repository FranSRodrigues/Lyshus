import AsyncStorage from '@react-native-async-storage/async-storage';

export type Avaliacao = {
  id: string;
  rating: number;
  comentario?: string;
};

const STORAGE_KEY = "@avaliacoes";

export async function getAvaliacoes(): Promise<Avaliacao[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Erro ao carregar avaliações:", error);
    return [];
  }
}

export async function salvarAvaliacao(nova: Avaliacao) {
  try {
    const atual = await getAvaliacoes();

    const atualizado = [...atual, nova];

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(atualizado));
    return true;
  } catch (error) {
    console.error("Erro ao salvar avaliação:", error);
    return false;
  }
}

export async function getAvaliacoesPorId(id: string) {
  const todas = await getAvaliacoes();
  return todas.filter(a => a.id === id);
}
