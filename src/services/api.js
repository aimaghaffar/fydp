import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
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

// Response interceptor to handle errors
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

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getCurrentUser: () => api.get('/auth/me'),
};

// Doctors API
export const doctorsAPI = {
  getAll: (params) => api.get('/doctors', { params }),
  getById: (id) => api.get(`/doctors/${id}`),
  getBySpecialty: (specialty) => api.get(`/doctors/specialty/${specialty}`),
};

// Appointments API
export const appointmentsAPI = {
  create: (appointmentData) => api.post('/appointments', appointmentData),
  getAll: () => api.get('/appointments'),
  getById: (id) => api.get(`/appointments/${id}`),
  update: (id, data) => api.put(`/appointments/${id}`, data),
  cancel: (id) => api.delete(`/appointments/${id}`),
  getUpcoming: () => api.get('/appointments/upcoming'),
};

// Users API
export const usersAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  addEmergencyContact: (data) => api.post('/users/emergency-contact', data),
  getMedicalHistory: () => api.get('/users/medical-history'),
  addMedicalHistory: (data) => api.post('/users/medical-history', data),
  deleteMedicalHistory: (id) => api.delete(`/users/medical-history/${id}`),
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
};

// Specialties API
export const specialtiesAPI = {
  getAll: () => api.get('/specialties'),
  getById: (id) => api.get(`/specialties/${id}`),
  getPopular: () => api.get('/specialties/popular'),
};

// Health check
export const healthCheck = () => api.get('/health');

export default api;