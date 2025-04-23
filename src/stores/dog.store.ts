import { create } from 'zustand';
import { Dog } from '../types/dog.types';

interface DogsState {
  favorites: string[];
  matchedDog: Dog | null;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  setMatchedDog: (dog: Dog | null) => void;
}

export const useDogsStore = create<DogsState>((set) => ({
  favorites: [],
  matchedDog: null,
  addFavorite: (id) => 
    set((state) => ({ favorites: [...state.favorites, id] })),
  removeFavorite: (id) => 
    set((state) => ({ favorites: state.favorites.filter(fav => fav !== id) })),
  setMatchedDog: (dog) => set({ matchedDog: dog }),
}));