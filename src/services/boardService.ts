import { Board } from '@/@types/Board';
import { Column } from '@/@types/Column';
import { SubTask } from '@/@types/Task';

import axiosInstance from './axiosInstance';

export interface CreateTaskBody {
  columnId: string;
  title: string;
  description: string;
  subtasks: string[]; // subtask titles
}

export interface UpdateTaskBody {
  columnId: string;
  title: string;
  description: string;
  subtasks: SubTask[];
}

export const createSubtask = async (data: SubTask): Promise<SubTask> => {
  const response = await axiosInstance.post('/subtasks', data);
  return response.data;
};

export const createTask = async (data: CreateTaskBody): Promise<CreateTaskBody> => {
  const response = await axiosInstance.post('/tasks', data);
  return response.data;
};

export const deleteTask = async (taskId: string): Promise<void> => {
  await axiosInstance.delete(`/tasks/${taskId}`);
};

export const deleteSubtask = async (subtaskId: string): Promise<void> => {
  await axiosInstance.delete(`/subtasks/${subtaskId}`);
};

export const updateTask = async (req: {
  taskId: string;
  data: Partial<UpdateTaskBody>;
}): Promise<void> => {
  const { taskId, data } = req;
  await axiosInstance.put(`/tasks/${taskId}`, data);
};

export const updateSubtask = async (subtaskId: string, data: Partial<SubTask>): Promise<void> => {
  await axiosInstance.put(`/subtasks/${subtaskId}`, data);
};

export const getBoards = async (): Promise<Board[]> => {
  const response = await axiosInstance.get('/boards');
  return response.data;
}

export const createBoard = async (data: { name: string, columns: string[] }): Promise<Board> => {
  const response = await axiosInstance.post('/boards', data);
  return response.data;
};

export const editBoard = async (data: {
  boardId: string;
  name: string;
  columns: Column[];
}): Promise<void> => {
  const { boardId, name, columns } = data;
  const response = await axiosInstance.put(`/boards/${boardId}`, { name, columns });
  return response.data;
};

export const deleteBoard = async (boardId: string): Promise<void> => {
  await axiosInstance.delete(`/boards/${boardId}`);
};

export const reorderTasksInColumn = async (data: {
  columnId: string;
  boardId: string;
  sourceIndex: number;
  destinationIndex: number;
}): Promise<void> => {
  const {
    columnId, boardId, sourceIndex, destinationIndex,
  } = data;
  await axiosInstance.put(`/boards/${boardId}/column/${columnId}/tasks/reorder`, {
    sourceIndex,
    destinationIndex,
  });
};

export const reorderColumns = async (data: {
  boardId: string;
  sourceIndex: number;
  destinationIndex: number;
}): Promise<void> => {
  const {
    boardId, sourceIndex, destinationIndex,
  } = data;
  await axiosInstance.put(`/boards/${boardId}/columns/reorder`, {
    sourceIndex,
    destinationIndex,
  });
};

export const moveTaskToAnotherColumnApi = async (data: {
  taskId: string;
  sourceColumnId: string;
  destinationColumnId: string;
  sourceIndex: number;
  destinationIndex: number;
}): Promise<void> => {
  const {
    taskId, sourceColumnId, destinationColumnId, sourceIndex, destinationIndex,
  } = data;
  await axiosInstance.put(`/tasks/${taskId}/move`, {
    sourceColumnId,
    destinationColumnId,
    sourceIndex,
    destinationIndex,
  });
};
