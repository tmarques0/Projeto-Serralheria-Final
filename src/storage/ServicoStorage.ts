// Lê e grava os serviços no AsyncStorage.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Servico } from '../types/Servico';

const CHAVE_SERVICOS = '@serralheria:servicos';

export async function lerServicos(): Promise<Servico[] | null> {
  const dados = await AsyncStorage.getItem(CHAVE_SERVICOS);

  return dados ? JSON.parse(dados) : null;
}

export async function gravarServicos(servicos: Servico[]): Promise<void> {
  await AsyncStorage.setItem(CHAVE_SERVICOS, JSON.stringify(servicos));
}
