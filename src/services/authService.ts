
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Configuration Supabase - remplacez par vos clés
const SUPABASE_URL = 'https://votre-projet.supabase.co';
const SUPABASE_ANON_KEY = 'votre-clé-publique-supabase';

export interface User {
  id: string;
  email: string;
  username?: string;
  location?: string;
  bio?: string;
  created_at: string;
}

export interface AuthResponse {
  user: User;
  session: any;
}

export class AuthService {
  private static supabase: SupabaseClient;

  static initialize() {
    if (!this.supabase) {
      this.supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return this.supabase;
  }

  static getSupabase() {
    return this.initialize();
  }

  static async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await this.getSupabase().auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      const { user, session } = data;
      
      return { 
        user: {
          id: user?.id || '',
          email: user?.email || '',
          created_at: user?.created_at || new Date().toISOString()
        }, 
        session 
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  static async register(email: string, password: string, username?: string): Promise<AuthResponse> {
    try {
      const { data, error } = await this.getSupabase().auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });
      
      if (error) throw error;
      
      const { user, session } = data;
      
      // Si l'inscription est réussie, créer un profil utilisateur
      if (user) {
        await this.getSupabase()
          .from('profiles')
          .upsert({
            id: user.id,
            username: username || email.split('@')[0],
            created_at: new Date().toISOString(),
          });
      }
      
      return { 
        user: {
          id: user?.id || '',
          email: user?.email || '',
          username,
          created_at: user?.created_at || new Date().toISOString()
        }, 
        session 
      };
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  }

  static async logout() {
    const { error } = await this.getSupabase().auth.signOut();
    if (error) throw error;
  }

  static isAuthenticated() {
    return this.getSupabase().auth.getSession().then(({ data }) => {
      return !!data.session;
    });
  }

  static async getProfile() {
    try {
      const { data: { session } } = await this.getSupabase().auth.getSession();
      
      if (!session) {
        throw new Error('Not authenticated');
      }
      
      const { data, error } = await this.getSupabase()
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  }
}

export default AuthService;
