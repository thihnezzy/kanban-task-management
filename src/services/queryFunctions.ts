// src/api/queryFunctions.ts
import axiosInstance from './axiosInstance';

type FetchOptions = {
  url: string;
  params?: Record<string, unknown>;
};

export default async <T>({ url, params }: FetchOptions): Promise<T> => {
  const response = await axiosInstance.get<T>(url, { params });
  return response.data;
};
