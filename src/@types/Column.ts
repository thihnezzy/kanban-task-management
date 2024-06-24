import type { Task } from './Task';

export type Column = {
  id: string;
  name: string;
  tasks: Task[];
};
