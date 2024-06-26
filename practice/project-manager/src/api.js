import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Замените на ваш базовый URL

export const getProjects = async () => {
  const response = await axios.get(`${API_BASE_URL}/projects`);
  return response.data;
};

export const createProject = async (project) => {
  const response = await axios.post(`${API_BASE_URL}/projects`, project);
  return response.data;
};

export const deleteProject = async (projectId) => {
  const response = await axios.delete(`${API_BASE_URL}/projects/${projectId}`);
  return response.data;
};

export const getImages = async (projectId) => { 
  const response = await axios.get(`${API_BASE_URL}/projects/${projectId}/images`); 
  return response.data;
};

export const uploadImage = async (imageData) => {
  const response = await axios.post(`${API_BASE_URL}/images`, imageData);
  return response.data;
};