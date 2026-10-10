// Campo de texto com rótulo e erro. Fica vermelho se tiver erro.

import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

type CustomInputProps = TextInputProps & {
  label: string;
  error?: string;
  invalid?: boolean;
};

// error mostra a mensagem; invalid só deixa vermelho
export default function CustomInput({
  label,
  error,
  invalid,
  multiline,
  style,
  ...rest
}: CustomInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={[
          styles.input,
          multiline ? styles.multiline : null,
          error || invalid ? styles.inputError : null,
          style,
        ]}
        placeholderTextColor="#9CA3AF"
        multiline={multiline}
        {...rest}
      />

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
  input: {
    minHeight: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#111827',
  },
  multiline: {
    minHeight: 120,
    paddingVertical: 12,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#DC2626',
    backgroundColor: '#FEF2F2',
  },
  errorText: {
    marginTop: 5,
    fontSize: 12,
    color: '#DC2626',
  },
});
