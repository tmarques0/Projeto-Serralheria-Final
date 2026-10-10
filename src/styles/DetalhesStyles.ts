// Estilos da tela de detalhes.

import { StyleSheet } from 'react-native';

export const detalhesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 18,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#6B7280',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  titleArea: {
    flex: 1,
    paddingRight: 12,
  },
  productName: {
    fontSize: 21,
    fontWeight: '700',
    color: '#111827',
  },
  category: {
    marginTop: 5,
    fontSize: 14,
    color: '#6B7280',
  },
  badge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: '#15803D',
    fontSize: 10,
    fontWeight: '700',
  },
  separator: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#111827',
    lineHeight: 22,
    marginBottom: 18,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 12,
  },
  infoBox: {
    flex: 1,
  },
  notFoundText: {
    margin: 20,
  },
  primaryAction: {
    marginTop: 18,
  },
  action: {
    marginTop: 10,
  },
});
