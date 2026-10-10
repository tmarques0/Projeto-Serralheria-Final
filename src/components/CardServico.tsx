// Cartão que mostra um serviço.

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { formatarPreco } from '../services/ServicoService';
import { ServicoCompleto } from '../types/Servico';

type CardServicoProps = {
  servico: ServicoCompleto;
  onDetalhes?: () => void;
  onEditar?: () => void;
  onExcluir?: () => void;
};

export default function CardServico({
  servico,
  onDetalhes,
  onEditar,
  onExcluir,
}: CardServicoProps) {
  // só mostra os botões se vier alguma ação
  const temAcoes = !!(onDetalhes || onEditar || onExcluir);

  return (
    <View style={styles.card}>
      <View style={styles.cabecalho}>
        <View style={styles.tituloArea}>
          <Text style={styles.titulo}>{servico.nome}</Text>
          <Text style={styles.categoria}>{servico.categoriaNome}</Text>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeTexto}>DISPONÍVEL</Text>
        </View>
      </View>

      <Text style={styles.descricao}>{servico.descricao}</Text>

      <Text style={styles.resumo}>
        {formatarPreco(servico.preco)} • Prazo: {servico.prazo} dias
      </Text>

      {temAcoes ? (
        <View style={styles.rodape}>
          {onDetalhes ? (
            <TouchableOpacity
              style={[styles.acao, styles.acaoDetalhes]}
              onPress={onDetalhes}
            >
              <Text style={[styles.acaoTexto, styles.textoDetalhes]}>
                Detalhes
              </Text>
            </TouchableOpacity>
          ) : null}

          {onEditar ? (
            <TouchableOpacity
              style={[styles.acao, styles.acaoEditar]}
              onPress={onEditar}
            >
              <Text style={[styles.acaoTexto, styles.textoEditar]}>
                Editar
              </Text>
            </TouchableOpacity>
          ) : null}

          {onExcluir ? (
            <TouchableOpacity
              style={[styles.acao, styles.acaoExcluir]}
              onPress={onExcluir}
            >
              <Text style={[styles.acaoTexto, styles.textoExcluir]}>
                Excluir
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  tituloArea: {
    flex: 1,
    paddingRight: 12,
  },
  titulo: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
  },
  categoria: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 5,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: '#DCFCE7',
  },
  badgeTexto: {
    fontSize: 11,
    fontWeight: '700',
    color: '#15803D',
  },
  descricao: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 19,
    marginTop: 8,
  },
  resumo: {
    marginTop: 8,
    fontWeight: '600',
    color: '#111827',
  },
  rodape: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  acao: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  acaoTexto: {
    fontSize: 13,
    fontWeight: '600',
  },
  acaoDetalhes: {
    backgroundColor: '#E0E7FF',
  },
  textoDetalhes: {
    color: '#3730A3',
  },
  acaoEditar: {
    backgroundColor: '#FEF3C7',
  },
  textoEditar: {
    color: '#B45309',
  },
  acaoExcluir: {
    backgroundColor: '#FEF2F2',
  },
  textoExcluir: {
    color: '#DC2626',
  },
});
