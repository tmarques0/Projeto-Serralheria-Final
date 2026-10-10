// Botão do app. Tem 2 estilos: primário e secundário.

import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

type BotaoPrincipalProps = {
  titulo: string;
  onPress: () => void;
  variante?: 'primario' | 'secundario';
  carregando?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function BotaoPrincipal({
  titulo,
  onPress,
  variante = 'primario',
  carregando = false,
  style,
}: BotaoPrincipalProps) {
  const primario = variante === 'primario';

  return (
    <TouchableOpacity
      style={[
        styles.botao,
        primario ? styles.primario : styles.secundario,
        carregando ? styles.bloqueado : null,
        style,
      ]}
      onPress={onPress}
      disabled={carregando}
      activeOpacity={0.8}
    >
      {carregando ? (
        <ActivityIndicator color={primario ? '#FFFFFF' : '#B45309'} />
      ) : (
        <Text
          style={[styles.texto, primario ? styles.textoPrimario : styles.textoSecundario]}
        >
          {titulo}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primario: {
    backgroundColor: '#B45309',
  },
  secundario: {
    backgroundColor: '#FEF3C7',
  },
  bloqueado: {
    opacity: 0.6,
  },
  texto: {
    fontSize: 15,
    fontWeight: '700',
  },
  textoPrimario: {
    color: '#FFFFFF',
  },
  textoSecundario: {
    color: '#B45309',
  },
});
