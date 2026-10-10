// Estilos da tela de login.

import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  content: {
    width: '100%',
    maxWidth: 450,
    alignSelf: 'center',
  },

  logoArea: {
    alignItems: 'center',
    marginBottom: 40,
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#7C2D12',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
  },

  form: {
    width: '100%',
  },

  errorText: {
    color: '#DC2626',
    marginBottom: 12,
  },

  infoContainer: {
    alignItems: 'center',
    marginTop: 28,
  },

  infoText: {
    color: '#6B7280',
    fontSize: 14,
  },

  demoText: {
    marginTop: 8,
    color: '#6B7280',
    textAlign: 'center',
  },
});
