import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Configure Axios to automatically attach the Auth JWT from localStorage
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Types based on Prisma schema
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface Listing {
  id: string;
  title: string;
  description?: string;
  price: number;
  condition: 'NEW' | 'LIKE_NEW' | 'GOOD' | 'FAIR' | 'POOR';
  location: string;
  tags: string[];
  edition?: string;
  isbn?: string;
  userId: string;
  user: User;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
}

export interface CreateListingDto {
  title: string;
  description?: string;
  price: number;
  condition: 'NEW' | 'LIKE_NEW' | 'GOOD' | 'FAIR' | 'POOR';
  location: string;
  tags: string[];
  edition?: string;
  isbn?: string;
  images: string[];
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export const authApi = {
  login: (data: LoginDto) => api.post<AuthResponse>('/auth/login', data),
  register: (data: RegisterDto) => api.post<AuthResponse>('/auth/register', data),
  profile: () => api.get<{ success: boolean; user: User }>('/auth/me'),
};

export interface ListingsResponse {
  success: boolean;
  count?: number;
  listings: Listing[];
}

// Listings APIs
export const listingsApi = {
  getAll: (params?: { search?: string; condition?: string; minPrice?: number; maxPrice?: number }) =>
    api.get<ListingsResponse>('/listings', { params }),
  getById: (id: string) => api.get<{ success: boolean, listing: Listing }>(`/listings/${id}`),
  create: (data: CreateListingDto) => api.post<{ success: boolean, listing: Listing }>('/listings', data),
  update: (id: string, data: Partial<CreateListingDto>) => api.patch<{ success: boolean, listing: Listing }>(`/listings/${id}`, data),
  delete: (id: string) => api.delete(`/listings/${id}`),
  getUserListings: () => api.get<ListingsResponse>('/listings/user'),
};

// Users APIs
export const usersApi = {
  getProfile: () => api.get<User>('/users/profile'),
  updateProfile: (data: Partial<User>) => api.patch<User>('/users/profile', data),
};
