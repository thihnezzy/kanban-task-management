import axiosInstance from './axiosInstance';

export interface CreateSubtaskBody {
  title: string;
  isCompleted: boolean;
  taskId: string;
}

export interface CreateTaskBody {
  columnId: string;
  title: string;
  description: string;
  subtasks: string[]; // subtask titles
}

export const createSubtask = async (data: CreateSubtaskBody): Promise<CreateSubtaskBody> => {
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

export const updateTask = async (taskId: string, data: Partial<CreateTaskBody>): Promise<void> => {
  await axiosInstance.put(`/tasks/${taskId}`, data);
};

export const updateSubtask = async (subtaskId: string, data: Partial<CreateSubtaskBody>): Promise<void> => {
  await axiosInstance.put(`/subtasks/${subtaskId}`, data);
};
