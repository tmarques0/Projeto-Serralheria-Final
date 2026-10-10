// Tela de login: pede e-mail e senha e confere o usuário.

import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import BotaoPrincipal from '../components/BotaoPrincipal';
import CustomInput from '../components/CustomInput';
import { autenticar } from '../storage/AuthStorage';
import { loginStyles } from '../styles/LoginStyles';

export default function LoginScreen({ onLogin }: any) {
  // guarda o que foi digitado e os erros
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erroEmail, setErroEmail] = useState('');
  const [erroSenha, setErroSenha] = useState('');
  const [erroGeral, setErroGeral] = useState('');
  const [credenciaisInvalidas, setCredenciaisInvalidas] = useState(false);
  const [carregando, setCarregando] = useState(false);

  // confere e-mail e senha antes de entrar
  function validar(): boolean {
    const emailNormalizado = email.trim();
    let novoErroEmail = '';
    let novoErroSenha = '';

    if (!emailNormalizado) {
      novoErroEmail = 'Informe o e-mail.';
    } else if (
      !emailNormalizado.includes('@') ||
      !emailNormalizado.includes('.')
    ) {
      novoErroEmail = 'Digite um e-mail válido.';
    }

    if (!senha) {
      novoErroSenha = 'Informe a senha.';
    } else if (senha.length < 6) {
      novoErroSenha = 'A senha deve ter pelo menos 6 caracteres.';
    }

    setErroEmail(novoErroEmail);
    setErroSenha(novoErroSenha);
    setErroGeral('');
    setCredenciaisInvalidas(false);

    return !novoErroEmail && !novoErroSenha;
  }

  // valida, confere o usuário e abre o Dashboard
  async function entrar(): Promise<void> {
    if (!validar()) {
      return;
    }

    setCarregando(true);

    try {
      const sessao = await autenticar(email.trim(), senha);

      if (!sessao) {
        setCredenciaisInvalidas(true);
        setErroSenha('E-mail ou senha inválidos.');
        return;
      }

      Alert.alert('Login realizado', `Bem-vindo, ${sessao.nome}!`);
      onLogin();
    } catch (error) {
      setErroGeral('Não foi possível realizar o login. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  }

  function alterarEmail(texto: string): void {
    setEmail(texto);
    setErroEmail('');
    setErroGeral('');
    setCredenciaisInvalidas(false);
    setErroSenha((atual) => (atual === 'E-mail ou senha inválidos.' ? '' : atual));
  }

  function alterarSenha(texto: string): void {
    setSenha(texto);
    setErroSenha('');
    setErroGeral('');
    setCredenciaisInvalidas(false);
  }

  return (
    <View style={loginStyles.container}>
      <View style={loginStyles.content}>
        <View style={loginStyles.logoArea}>
          <Text style={loginStyles.title}>Serralheria</Text>
          <Text style={loginStyles.subtitle}>
            Sistema de gestão de serviços de serralheria
          </Text>
        </View>

        <View style={loginStyles.form}>
          <CustomInput
            label="E-mail"
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={alterarEmail}
            error={erroEmail}
            invalid={credenciaisInvalidas}
          />

          <CustomInput
            label="Senha"
            placeholder="Digite sua senha"
            secureTextEntry
            value={senha}
            onChangeText={alterarSenha}
            error={erroSenha}
          />

          {erroGeral ? (
            <Text style={loginStyles.errorText}>{erroGeral}</Text>
          ) : null}

          <BotaoPrincipal
            titulo="Entrar"
            onPress={entrar}
            carregando={carregando}
          />

          <View style={loginStyles.infoContainer}>
            <Text style={loginStyles.infoText}>Acesso administrativo</Text>
            <Text style={loginStyles.demoText}>
              Demo: admin@serralheria.com / 123456
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
