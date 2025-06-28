import axios from 'axios';
import { Product, User, AuthResponse, LoginRequest, RegisterRequest } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Product API
export const productAPI = {
  getAll: () => api.get<Product[]>('/api/products'),
  getById: (id: number) => api.get<Product>(`/api/products/${id}`),
  getByCategory: (category: string) => api.get<Product[]>(`/api/products/category/${category}`),
  getByBrand: (brand: string) => api.get<Product[]>(`/api/products/brand/${brand}`),
  search: (keyword: string) => api.get<Product[]>(`/api/products/search?keyword=${keyword}`),
  getAvailable: () => api.get<Product[]>('/api/products/available'),
  create: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'active'>) => 
    api.post<Product>('/api/products', product),
  update: (id: number, product: Partial<Product>) => 
    api.put<Product>(`/api/products/${id}`, product),
  delete: (id: number) => api.delete(`/api/products/${id}`),
  updateStock: (id: number, quantity: number) => 
    api.put<boolean>(`/api/products/${id}/stock?quantity=${quantity}`),
  checkStock: (id: number, quantity: number) => 
    api.get<boolean>(`/api/products/${id}/stock/check?quantity=${quantity}`),
};

// User API
export const userAPI = {
  register: (userData: RegisterRequest) => api.post<AuthResponse>('/api/users/register', userData),
  login: (credentials: LoginRequest) => api.post<AuthResponse>('/api/users/login', credentials),
  getCurrent: () => api.get<User>('/api/users/current'),
  getById: (id: number) => api.get<User>(`/api/users/${id}`),
  getByUsername: (username: string) => api.get<User>(`/api/users/username/${username}`),
  getAll: () => api.get<User[]>('/api/users'),
  update: (id: number, userData: Partial<RegisterRequest>) => 
    api.put<User>(`/api/users/${id}`, userData),
  delete: (id: number) => api.delete(`/api/users/${id}`),
  enable: (id: number) => api.put(`/api/users/${id}/enable`),
  disable: (id: number) => api.put(`/api/users/${id}/disable`),
  changeRole: (id: number, role: string) => api.put(`/api/users/${id}/role?role=${role}`),
  validateToken: (token: string) => api.post<boolean>('/api/users/validate-token', null, {
    params: { token }
  }),
};

export default api; 