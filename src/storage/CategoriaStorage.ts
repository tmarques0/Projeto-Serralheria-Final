// Lê e grava as categorias no AsyncStorage.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Categoria } from '../types/Categoria';

const CHAVE_CATEGORIAS = '@serralheria:categorias';

export async function lerCategorias(): Promise<Categoria[] | null> {
  const dados = await AsyncStorage.getItem(CHAVE_CATEGORIAS);

  return dados ? (JSON.parse(dados) as Categoria[]) : null;
}

export async function gravarCategorias(
  categorias: Categoria[],
): Promise<void> {
  await AsyncStorage.setItem(CHAVE_CATEGORIAS, JSON.stringify(categorias));
}
