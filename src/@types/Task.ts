export type SubTask = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  column: string;
  subtasks: SubTask[];
};
