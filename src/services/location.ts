import { Location, LocationSearchParams, LocationSearchResult } from '../types/dog.types';
import api from '../utils/api';

export const getLocations = async (zipCodes: string[]): Promise<Location[]> => {
  if (zipCodes.length > 100) {
    throw new Error('Maximum 100 ZIP codes allowed per request');
  }
  const response = await api.post<Location[]>('/locations', zipCodes);
  return response.data;
};

export const searchLocations = async (
  params: LocationSearchParams
): Promise<LocationSearchResult> => {
  const response = await api.post<LocationSearchResult>('/locations/search', params);
  return response.data;
};