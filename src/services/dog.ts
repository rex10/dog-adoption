import { Dog, SearchParams } from '../types/dog.types';
import api from '../utils/api';

export const getBreeds = async (): Promise<string[]> => {
  const response = await api.get('/dogs/breeds');
  return response.data;
};

export const searchDogs = async (params: SearchParams) => {
    const response = await api.get('/dogs/search', { params });
  return response.data;
};

export const getDogs = async (ids: string[]): Promise<Dog[]> => {
  const response = await api.post('/dogs', ids);
  return response.data;
};

export const matchDog = async (ids: string[]): Promise<string> => {
  const response = await api.post('/dogs/match', ids);
  return response.data.match;
};