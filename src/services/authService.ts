
import axios from 'axios';

// URL de base de l'API - à configurer selon votre environnement
const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api'
  : 'http://localhost:3000/api';

export interface User {
  id: number;
  email: string;
  username?: string;
  location?: string;
  bio?: string;
  created_at: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export class AuthService {
  static getApiUrl() {
    return API_URL;
  }

  static async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      
      // Stocker le token dans le localStorage
      localStorage.setItem('authToken', response.data.token);
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  static async register(email: string, password: string, username?: string): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        email,
        password,
        username,
      });
      
      // Stocker le token dans le localStorage
      localStorage.setItem('authToken', response.data.token);
      
      return response.data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  }

  static logout() {
    localStorage.removeItem('authToken');
  }

  static getToken() {
    return localStorage.getItem('authToken');
  }

  static isAuthenticated() {
    return !!this.getToken();
  }

  static async getProfile() {
    try {
      const token = this.getToken();
      
      if (!token) {
        throw new Error('Not authenticated');
      }
      
      const response = await axios.get(`${API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  }
}

export default AuthService;
