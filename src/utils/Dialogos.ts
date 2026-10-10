// Avisos e confirmações. No navegador o Alert não funciona, por isso o if.

import { Alert, Platform } from 'react-native';


export function avisar(
  titulo: string,
  mensagem: string,
  aoFechar?: () => void,
): void {
  if (Platform.OS === 'web') {
    window.alert(`${titulo}\n\n${mensagem}`);
    aoFechar?.();
    return;
  }

  Alert.alert(
    titulo,
    mensagem,
    aoFechar ? [{ text: 'OK', onPress: aoFechar }] : undefined,
  );
}

export function confirmar(
  titulo: string,
  mensagem: string,
  aoConfirmar: () => void,
  textoConfirmar: string = 'Excluir',
): void {
  if (Platform.OS === 'web') {
    if (window.confirm(`${titulo}\n\n${mensagem}`)) {
      aoConfirmar();
    }
    return;
  }

  Alert.alert(titulo, mensagem, [
    { text: 'Cancelar', style: 'cancel' },
    { text: textoConfirmar, style: 'destructive', onPress: aoConfirmar },
  ]);
}
