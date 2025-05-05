import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import React from 'react';

import { Link } from 'expo-router';

import { Box } from '@/components/Box';
import { Button } from '@/components/Button';
import { ButtonForward } from '@/components/ButtonForward';

import { formatDate } from '@/utils/formatDate';
import { getPriorityColor, getStatusColor } from '@/utils/getColors';

import { TaskResponseType } from '@/types/models/task';

type TaskListItemProps = {
  task: TaskResponseType;
  onDelete: (taskId: string) => void;
  onPressItem: (task: TaskResponseType) => void;
};

export const TaskListItem = React.memo(
  ({ task, onDelete, onPressItem }: TaskListItemProps) => {
    const descriptionText = task.description ? String(task.description) : null;
    const dueDateText = task.due_date
      ? `Vencimento: ${formatDate(task.due_date as string)}`
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
                  backgroundColor: getStatusColor(task.status),
                },
              ]}
            >
              <Text style={styles.detailChipText}>{String(task.status)}</Text>
            </Box>
            <Box
              style={[
                styles.detailChip,
                {
                  backgroundColor: getPriorityColor(task.priority),
                },
              ]}
            >
              <Text style={styles.detailChipText}>{String(task.priority)}</Text>
            </Box>
            {dueDateText && <Text style={styles.dueDateText}>{dueDateText}</Text>}
          </Box>

          <Box style={styles.taskActions}>
            <Link href={`/edit-task/${String(task.id)}`} asChild>
              <ButtonForward
                title="Editar"
                variant="primary"
                accessibilityRole="button"
                style={styles.actionButton}
                onPress={(e) => e.stopPropagation()}
              />
            </Link>

            <Button
              title="Excluir"
              onPress={(e) => {
                e.stopPropagation();
                onDelete(String(task.id));
              }}
              isLoading={false}
              variant="secondary"
              accessibilityRole="button"
              style={[styles.actionButton, styles.deleteButton]}
            />
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
