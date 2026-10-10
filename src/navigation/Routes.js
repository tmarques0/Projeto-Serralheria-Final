// Define quais telas existem. Sem login só aparece o Login.

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen';
import DetalhesScreen from '../screens/DetalhesScreen';
import FormScreen from '../screens/FormScreen';
import ListScreen from '../screens/ListScreen';
import LoginScreen from '../screens/LoginScreen';
import { inicializarAutenticacao, obterSessao } from '../storage/AuthStorage';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const [carregando, setCarregando] = useState(true);
  const [autenticado, setAutenticado] = useState(false);

  // ao abrir o app, vê se já tem alguém logado
  useEffect(() => {
    async function verificarSessao() {
      try {
        await inicializarAutenticacao();
        const sessao = await obterSessao();
        setAutenticado(!!sessao);
      } finally {
        setCarregando(false);
      }
    }

    verificarSessao();
  }, []);

  // mostra o carregando enquanto verifica
  if (carregando) {
    return (
      <View style={styles.carregando}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // sem login só existe o Login; com login existem as outras telas
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerBackTitle: 'Voltar' }}>
        {!autenticado ? (
          <Stack.Screen name="Login" options={{ title: 'Login' }}>
            {(props) => (
              <LoginScreen {...props} onLogin={() => setAutenticado(true)} />
            )}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Dashboard" options={{ title: 'Serralheria' }}>
              {(props) => (
                <DashboardScreen
                  {...props}
                  onLogout={() => setAutenticado(false)}
                />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="Form"
              component={FormScreen}
              options={{ title: 'Novo Serviço' }}
            />

            <Stack.Screen
              name="List"
              component={ListScreen}
              options={{ title: 'Serviços' }}
            />

            <Stack.Screen
              name="Detalhes"
              component={DetalhesScreen}
              options={{ title: 'Detalhes do Serviço' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  carregando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
