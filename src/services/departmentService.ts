import axiosClient from '../api/axiosClient';
import type { Department } from '../types/type';

export const getAllDepartments = async (): Promise <Department[]> => {
  const response = await axiosClient.get ('/Departments');
  return response.data;
};

export const getDepartmentById = async (id:string) => {
  const response = await axiosClient.get(`/Departments_Details?id=eq.${id}`);
  return response.data[0];
};