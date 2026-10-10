// Tela inicial: mostra o resumo e os últimos serviços.

import React, { useCallback, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import CardServico from '../components/CardServico';
import { listarServicos, obterResumo } from '../services/ServicoService';
import { encerrarSessao, obterSessao } from '../storage/AuthStorage';
import { dashboardStyles } from '../styles/DashboardStyles';
import { ServicoCompleto } from '../types/Servico';

export default function DashboardScreen({ navigation, onLogout }: any) {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [totalServicos, setTotalServicos] = useState(0);
  const [categorias, setCategorias] = useState(0);
  const [recentes, setRecentes] = useState<ServicoCompleto[]>([]);

  // busca o nome, os totais e os últimos serviços
  const carregarDados = useCallback(async (): Promise<void> => {
    try {
      const sessao = await obterSessao();
      const resumo = await obterResumo();
      const servicos = await listarServicos();

      setNomeUsuario(sessao?.nome ?? '');
      setTotalServicos(resumo.totalServicos);
      setCategorias(resumo.totalCategorias);
      setRecentes(servicos.slice(-2).reverse());
    } catch (error) {
      console.log('Erro ao carregar o dashboard:', error);
    }
  }, []);

  // roda toda vez que a tela volta a aparecer
  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [carregarDados]),
  );

  // apaga a sessão e volta para o Login
  async function sairDaConta(): Promise<void> {
    await encerrarSessao();
    onLogout();
  }

  function abrirCadastro(): void {
    navigation.navigate('Form');
  }

  function abrirLista(): void {
    navigation.navigate('List');
  }

  function abrirDetalhes(servico: ServicoCompleto): void {
    navigation.navigate('Detalhes', { servico });
  }

  return (
    <ScrollView
      style={dashboardStyles.container}
      contentContainerStyle={dashboardStyles.content}
    >
      <View style={dashboardStyles.header}>
        <View style={dashboardStyles.greetingArea}>
          <Text style={dashboardStyles.greeting}>Olá,</Text>
          <Text style={dashboardStyles.userName}>{nomeUsuario}</Text>
        </View>
      </View>

      <Text style={dashboardStyles.sectionTitle}>Resumo</Text>

      <View style={dashboardStyles.metricsContainer}>
        <View style={dashboardStyles.metricCard}>
          <Text style={dashboardStyles.metricLabel}>Serviços</Text>
          <Text style={dashboardStyles.metricValue}>{totalServicos}</Text>
          <Text style={dashboardStyles.metricDetail}>Cadastrados</Text>
        </View>

        <View style={dashboardStyles.metricCard}>
          <Text style={dashboardStyles.metricLabel}>Categorias</Text>
          <Text style={dashboardStyles.metricValue}>{categorias}</Text>
          <Text style={dashboardStyles.metricDetail}>Disponíveis</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[dashboardStyles.actionButton, dashboardStyles.logoutButton]}
        onPress={sairDaConta}
      >
        <View style={dashboardStyles.actionIcon}>
          <Text>🚪</Text>
        </View>
        <Text style={dashboardStyles.actionText}>Sair da conta</Text>
      </TouchableOpacity>

      <Text style={dashboardStyles.sectionTitle}>Ações rápidas</Text>

      <View style={dashboardStyles.quickActionsContainer}>
        <TouchableOpacity
          style={dashboardStyles.actionButton}
          onPress={abrirCadastro}
        >
          <View style={dashboardStyles.actionIcon}>
            <Text>➕</Text>
          </View>
          <Text style={dashboardStyles.actionText}>Cadastrar Serviço</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={dashboardStyles.actionButton}
          onPress={abrirLista}
        >
          <View style={dashboardStyles.actionIcon}>
            <Text>📋</Text>
          </View>
          <Text style={dashboardStyles.actionText}>Listar Serviços</Text>
        </TouchableOpacity>
      </View>

      <Text style={dashboardStyles.sectionTitle}>Últimos serviços</Text>

      <View style={dashboardStyles.recentList}>
        {recentes.length === 0 ? (
          <Text style={dashboardStyles.recentEmpty}>
            Nenhum serviço cadastrado ainda.
          </Text>
        ) : (
          recentes.map((servico) => (
            <CardServico
              key={servico.id}
              servico={servico}
              onDetalhes={() => abrirDetalhes(servico)}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
}
