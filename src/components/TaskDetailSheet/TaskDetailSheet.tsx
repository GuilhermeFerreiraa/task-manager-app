import { StyleSheet, Text } from 'react-native';

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { forwardRef, useMemo } from 'react';

import { formatDate } from '@/utils/formatDate';
import { priorities, statuses } from '@/utils/options';

import type { TaskResponseType } from '@/types/models/task';

import { Box } from '../Box';

interface TaskDetailSheetProps {
  task: TaskResponseType | null;
  onDismiss?: () => void;
}

export const TaskDetailSheet = forwardRef<BottomSheetModal, TaskDetailSheetProps>(
  ({ task, onDismiss }, ref) => {
    const snapPoints = useMemo(() => ['40%', '80%'], []);

    const getStatusLabel = (status: string): string => {
      return (
        statuses.find((s) => s.id.toUpperCase() === status.toUpperCase())?.label || status
      );
    };

    const getPriorityLabel = (priority: string): string => {
      return (
        priorities.find((s) => s.id.toUpperCase() === priority.toUpperCase())?.label ||
        priority
      );
    };

    if (!task) {
      return null;
    }

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            opacity={0.5}
          />
        )}
        onDismiss={onDismiss}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text style={styles.title}>{task.title}</Text>
          <Text style={styles.description}>{task.description}</Text>
          <Box style={styles.detailRow}>
            <Text style={styles.label}>Status:</Text>
            <Text style={styles.value}>{getStatusLabel(task.status)}</Text>
          </Box>
          <Box style={styles.detailRow}>
            <Text style={styles.label}>Prioridade:</Text>
            <Text style={styles.value}>{getPriorityLabel(task.priority)}</Text>
          </Box>
          <Box style={styles.detailRow}>
            <Text style={styles.label}>Vencimento:</Text>
            <Text style={styles.value}>
              {task.due_date ? formatDate(task.due_date) : 'N/A'}
            </Text>
          </Box>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

TaskDetailSheet.displayName = 'TaskDetailSheet';

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
    lineHeight: 22,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444',
  },
  value: {
    fontSize: 16,
    color: '#666',
  },
});
