// Opções para escolher a categoria.

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Categoria } from '../types/Categoria';

type SeletorCategoriaProps = {
  label: string;
  categorias: Categoria[];
  selecionadaId: string;
  onSelecionar: (id: string) => void;
  error?: string;
};

export default function SeletorCategoria({
  label,
  categorias,
  selecionadaId,
  onSelecionar,
  error,
}: SeletorCategoriaProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.opcoes}>
        {categorias.map((categoria) => {
          const selecionada = categoria.id === selecionadaId;

          return (
            <TouchableOpacity
              key={categoria.id}
              style={[styles.opcao, selecionada ? styles.opcaoAtiva : null]}
              onPress={() => onSelecionar(categoria.id)}
            >
              <Text
                style={[
                  styles.opcaoTexto,
                  selecionada ? styles.opcaoTextoAtivo : null,
                ]}
              >
                {categoria.nome}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  opcoes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  opcao: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
  },
  opcaoAtiva: {
    borderColor: '#B45309',
    backgroundColor: '#FEF3C7',
  },
  opcaoTexto: {
    fontSize: 14,
    color: '#374151',
  },
  opcaoTextoAtivo: {
    color: '#B45309',
    fontWeight: '700',
  },
  errorText: {
    marginTop: 5,
    fontSize: 12,
    color: '#DC2626',
  },
});
