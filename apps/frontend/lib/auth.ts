import { User } from './api';

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const getStoredUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const setStoredAuth = (user: User | null, token: string | null) => {
  if (typeof window === 'undefined') return;
  if (user && token) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
};
