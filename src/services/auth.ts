import api from '../utils/api';

export const login = async (name: string, email: string) => {
  return api.post('/auth/login', { name, email });
};

export const logout = async () => {
  return api.post('/auth/logout');
};
