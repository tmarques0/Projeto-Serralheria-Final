// Tela com a lista de serviços e a busca.

import React, { useCallback, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import CardServico from '../components/CardServico';
import {
  excluirServico,
  filtrarServicos,
  listarServicos,
} from '../services/ServicoService';
import { listStyles } from '../styles/ListStyles';
import { avisar, confirmar } from '../utils/Dialogos';
import { ServicoCompleto } from '../types/Servico';

export default function ListScreen({ navigation }: any) {
  const [servicos, setServicos] = useState<ServicoCompleto[]>([]);
  const [busca, setBusca] = useState('');

  // lê os serviços salvos
  const carregarServicos = useCallback(async (): Promise<void> => {
    try {
      setServicos(await listarServicos());
    } catch (error) {
      avisar('Erro', 'Não foi possível carregar os serviços.');
    }
  }, []);

  // recarrega a lista ao voltar para a tela
  useFocusEffect(
    useCallback(() => {
      carregarServicos();
    }, [carregarServicos]),
  );

  // pergunta antes de excluir
  function confirmarExclusao(id: string): void {
    confirmar(
      'Excluir serviço',
      'Tem certeza que deseja excluir este serviço?',
      async () => {
        try {
          await excluirServico(id);
          await carregarServicos();
        } catch (error) {
          avisar('Erro', 'Não foi possível excluir o serviço.');
        }
      },
    );
  }

  function abrirDetalhes(servico: ServicoCompleto): void {
    navigation.navigate('Detalhes', { servico });
  }

  function editarServico(servico: ServicoCompleto): void {
    navigation.navigate('Form', { servico });
  }

  // aplica a busca
  const filtrados = filtrarServicos(servicos, busca);

  return (
    <View style={listStyles.container}>
      <View style={listStyles.header}>
        <Text style={listStyles.title}>Serviços</Text>

        <View style={listStyles.searchContainer}>
          <Text style={listStyles.searchIcon}>🔍</Text>
          <TextInput
            style={listStyles.searchInput}
            placeholder="Pesquisar serviço..."
            placeholderTextColor="#9CA3AF"
            value={busca}
            onChangeText={setBusca}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={listStyles.listContent}>
        {filtrados.length === 0 ? (
          <View style={listStyles.emptyContainer}>
            <Text style={listStyles.emptyTitle}>
              Nenhum serviço encontrado
            </Text>
            <Text style={listStyles.emptyText}>
              Cadastre um serviço ou altere a pesquisa.
            </Text>
          </View>
        ) : (
          filtrados.map((servico) => (
            <CardServico
              key={servico.id}
              servico={servico}
              onDetalhes={() => abrirDetalhes(servico)}
              onEditar={() => editarServico(servico)}
              onExcluir={() => confirmarExclusao(servico.id)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}
