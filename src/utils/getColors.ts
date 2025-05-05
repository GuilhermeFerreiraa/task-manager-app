import { StyleSheet } from 'react-native';

import type { PriorityType } from '@/types/enums/Priority';
import type { StatusSchema } from '@/types/enums/Status';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

export const getPriorityColor = (priority: PriorityType): string => {
  switch (priority) {
    case 'HIGH':
      return '#FF3B30';
    case 'MEDIUM':
      return '#FF9500';
    case 'LOW':
      return '#34C759';
    default:
      return '#8E8E93';
  }
};

export const getStatusColor = (status: StatusSchema): string => {
  switch (status) {
    case 'PENDING':
      return '#FFCC00';
    case 'COMPLETED':
      return '#34C759';
    default:
      return '#8E8E93';
  }
};

export const getButtonStyle = (variant: ButtonVariant) => {
  switch (variant) {
    case 'secondary':
      return styles.secondaryButton;
    case 'danger':
      return styles.dangerButton;
    default:
      return styles.primaryButton;
  }
};

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: '#8E8E93',
  },
  dangerButton: {
    backgroundColor: '#FF3B30',
  },
});
