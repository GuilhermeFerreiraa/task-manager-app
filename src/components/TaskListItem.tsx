import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import React from 'react';

import { Link } from 'expo-router';

import { PriorityType } from '@/src/types/enums/Priority';
import { StatusSchema } from '@/src/types/enums/Status';

import { TaskResponseType } from '@/types/models/task';

import { Box } from './Box';

interface TaskListItemProps {
  task: TaskResponseType;
  onDelete: (taskId: string) => void;
  onPressItem: (task: TaskResponseType) => void;
}

const getPriorityColor = (priority: PriorityType): string => {
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

const getStatusColor = (status: StatusSchema): string => {
  switch (status) {
    case 'PENDING':
      return '#FFCC00';
    case 'COMPLETED':
      return '#34C759';
    default:
      return '#8E8E93';
  }
};

export const TaskListItem = React.memo(
  ({ task, onDelete, onPressItem }: TaskListItemProps) => {
    const descriptionText = task.description ? String(task.description) : null;
    const dueDateText = task.due_date
      ? `Vencimento: ${new Date(task.due_date as string).toLocaleDateString('pt-BR')}`
      : null;

    return (
      <TouchableOpacity onPress={() => onPressItem(task)} activeOpacity={0.7}>
        <Box style={styles.taskItem}>
          <Text style={styles.taskTitle}>{String(task.title)}</Text>
          {descriptionText && (
            <Text style={styles.taskDescription}>{descriptionText}</Text>
          )}

          <Box style={styles.detailsContainer}>
            <Box
              style={[
                styles.detailChip,
                {
                  backgroundColor: getStatusColor(task.status as StatusSchema),
                },
              ]}
            >
              <Text style={styles.detailChipText}>{String(task.status)}</Text>
            </Box>
            <Box
              style={[
                styles.detailChip,
                {
                  backgroundColor: getPriorityColor(task.priority as PriorityType),
                },
              ]}
            >
              <Text style={styles.detailChipText}>{String(task.priority)}</Text>
            </Box>
            {dueDateText && <Text style={styles.dueDateText}>{dueDateText}</Text>}
          </Box>

          <Box style={styles.taskActions}>
            <Link href={`/edit-task/${String(task.id)}`} asChild>
              <TouchableOpacity
                style={styles.actionButton}
                accessibilityRole="button"
                onPress={(e) => e.stopPropagation()}
              >
                <Text style={styles.actionButtonText}>Editar</Text>
              </TouchableOpacity>
            </Link>
            <TouchableOpacity
              style={[styles.actionButton, styles.deleteButton]}
              onPress={(e) => {
                e.stopPropagation();
                onDelete(String(task.id));
              }}
              accessibilityRole="button"
            >
              <Text style={styles.actionButtonText}>Excluir</Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  taskItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    flexWrap: 'wrap',
    gap: 8,
  },
  detailChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  detailChipText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  dueDateText: {
    fontSize: 12,
    color: '#8E8E93',
    marginLeft: 'auto',
  },
  taskActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 4,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
