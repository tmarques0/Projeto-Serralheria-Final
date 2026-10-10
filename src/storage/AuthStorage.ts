// Usuário e sessão de login (só para demonstração).

import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha: string;
}

export interface Sessao {
  id: string;
  nome: string;
  email: string;
}

export const ID_USUARIO_PADRAO = 'admin-1';

const CHAVE_USUARIO = '@serralheria:usuario';
const CHAVE_SESSAO = '@serralheria:sessao';

const USUARIO_PADRAO: Usuario = {
  id: ID_USUARIO_PADRAO,
  nome: 'Adrian',
  email: 'admin@serralheria.com',
  senha: '123456',
};
export async function inicializarAutenticacao(): Promise<void> {
  const usuarioSalvo = await AsyncStorage.getItem(CHAVE_USUARIO);

  if (!usuarioSalvo) {
    await AsyncStorage.setItem(
      CHAVE_USUARIO,
      JSON.stringify(USUARIO_PADRAO),
    );
  }
}
// confere e-mail e senha e salva a sessão
export async function autenticar(
  email: string,
  senha: string,
): Promise<Sessao | null> {
  await inicializarAutenticacao();

  const dados = await AsyncStorage.getItem(CHAVE_USUARIO);
  const usuario: Usuario = dados
    ? JSON.parse(dados)
    : USUARIO_PADRAO;

  const emailValido =
    email.trim().toLowerCase() === usuario.email.toLowerCase();
  const senhaValida = senha === usuario.senha;

  if (!emailValido || !senhaValida) {
    return null;
  }

  const sessao: Sessao = {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
  };

  await AsyncStorage.setItem(CHAVE_SESSAO, JSON.stringify(sessao));

  return sessao;
}
export async function obterSessao(): Promise<Sessao | null> {
  const sessaoSalva = await AsyncStorage.getItem(CHAVE_SESSAO);

  return sessaoSalva ? JSON.parse(sessaoSalva) : null;
}
export async function encerrarSessao(): Promise<void> {
  await AsyncStorage.removeItem(CHAVE_SESSAO);
}
