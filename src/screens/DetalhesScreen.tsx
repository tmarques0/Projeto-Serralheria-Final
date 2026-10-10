// Tela com as informações de um serviço.

import React, { useCallback, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import BotaoPrincipal from '../components/BotaoPrincipal';
import {
  buscarServicoPorId,
  excluirServico,
  formatarPreco,
} from '../services/ServicoService';
import { detalhesStyles } from '../styles/DetalhesStyles';
import { ServicoCompleto } from '../types/Servico';
import { avisar, confirmar } from '../utils/Dialogos';

export default function DetalhesScreen({ navigation, route }: any) {
  // serviço que veio da tela anterior
  const servicoRecebido: ServicoCompleto | undefined = route.params?.servico;
  const [servico, setServico] = useState<ServicoCompleto | undefined>(servicoRecebido);
  const idServico = servicoRecebido?.id;

  // relê o serviço ao voltar da edição, para mostrar os dados novos
  useFocusEffect(
    useCallback(() => {
      if (!idServico) {
        return;
      }

      let ativo = true;

      buscarServicoPorId(idServico)
        .then((atual) => {
          if (ativo) {
            setServico(atual);
          }
        })
        .catch(() => {
        });

      return () => {
        ativo = false;
      };
    }, [idServico]),
  );

  // pergunta, exclui e volta
  function excluir(): void {
    if (!servico) {
      return;
    }

    confirmar('Excluir serviço', `Deseja excluir ${servico.nome}?`, async () => {
      try {
        await excluirServico(servico.id);
        navigation.goBack();
      } catch (error) {
        avisar('Erro', 'Não foi possível excluir o serviço.');
      }
    });
  }

  function editar(): void {
    if (!servico) {
      return;
    }

    navigation.navigate('Form', { servico });
  }

  function voltar(): void {
    navigation.goBack();
  }

  if (!servico) {
    return (
      <View style={detalhesStyles.container}>
        <Text style={detalhesStyles.notFoundText}>
          Serviço não encontrado.
        </Text>

        <BotaoPrincipal
          titulo="Voltar"
          variante="secundario"
          onPress={voltar}
          style={detalhesStyles.action}
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={detalhesStyles.container}
      contentContainerStyle={detalhesStyles.content}
    >
      <View style={detalhesStyles.header}>
        <Text style={detalhesStyles.title}>Detalhes do Serviço</Text>
        <Text style={detalhesStyles.subtitle}>
          Informações do serviço de serralheria.
        </Text>
      </View>

      <View style={detalhesStyles.card}>
        <View style={detalhesStyles.titleRow}>
          <View style={detalhesStyles.titleArea}>
            <Text style={detalhesStyles.productName}>{servico.nome}</Text>
            <Text style={detalhesStyles.category}>{servico.categoriaNome}</Text>
          </View>

          <View style={detalhesStyles.badge}>
            <Text style={detalhesStyles.badgeText}>ORÇAMENTO</Text>
          </View>
        </View>

        <View style={detalhesStyles.separator} />

        <Text style={detalhesStyles.label}>Descrição</Text>
        <Text style={detalhesStyles.value}>{servico.descricao}</Text>

        <View style={detalhesStyles.infoRow}>
          <View style={detalhesStyles.infoBox}>
            <Text style={detalhesStyles.label}>Valor estimado</Text>
            <Text style={detalhesStyles.value}>
              {formatarPreco(servico.preco)}
            </Text>
          </View>

          <View style={detalhesStyles.infoBox}>
            <Text style={detalhesStyles.label}>Prazo</Text>
            <Text style={detalhesStyles.value}>{servico.prazo} dias</Text>
          </View>
        </View>

        <Text style={detalhesStyles.label}>Código do serviço</Text>
        <Text style={detalhesStyles.value}>{servico.id}</Text>
      </View>

      <BotaoPrincipal
        titulo="Editar serviço"
        onPress={editar}
        style={detalhesStyles.primaryAction}
      />

      <BotaoPrincipal
        titulo="Excluir serviço"
        variante="secundario"
        onPress={excluir}
        style={detalhesStyles.action}
      />

      <BotaoPrincipal
        titulo="Voltar"
        variante="secundario"
        onPress={voltar}
        style={detalhesStyles.action}
      />
    </ScrollView>
  );
}
