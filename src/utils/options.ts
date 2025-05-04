import { prioritySchemaEnum } from '@/types/enums/Priority';
import { statusSchemaEnum } from '@/types/enums/Status';

export const priorities = [
  { id: prioritySchemaEnum.LOW, label: 'Baixa' },
  { id: prioritySchemaEnum.MEDIUM, label: 'Média' },
  { id: prioritySchemaEnum.HIGH, label: 'Alta' },
];

export const statuses = [
  { id: statusSchemaEnum.PENDING, label: 'Pendente' },
  { id: statusSchemaEnum.COMPLETED, label: 'Concluída' },
];
