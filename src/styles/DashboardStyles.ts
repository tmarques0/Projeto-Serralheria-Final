// Estilos da tela de dashboard.

import { StyleSheet } from 'react-native';

export const dashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },

  greetingArea: {
    flex: 1,
  },

  greeting: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },

  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },

  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  headerIconButton: {
    width: 44,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 2,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 14,
  },

  metricsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 28,
  },

  metricCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.07,
    shadowRadius: 5,

    elevation: 3,
  },

  metricLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 8,
  },

  metricValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#7C2D12',
  },

  metricDetail: {
    fontSize: 12,
    color: '#16A34A',
    marginTop: 6,
    fontWeight: '600',
  },

  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 14,
    marginBottom: 28,
  },

  actionButton: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 22,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 4,

    elevation: 2,
  },

  logoutButton: {
    marginBottom: 20,
  },

  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },

  bottomNavigation: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,

    height: 70,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,

    elevation: 6,
  },

  navigationButton: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  navigationButtonActive: {
    backgroundColor: '#FEF3C7',
    marginVertical: 10,
    marginHorizontal: 8,
    borderRadius: 14,
  },

  navigationText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },

  navigationTextActive: {
    color: '#B45309',
    fontWeight: '700',
  },

  recentList: {
    marginBottom: 12,
  },

  recentEmpty: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
});
