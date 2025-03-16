
import mysql from 'mysql2/promise';

// Configuration de la base de données - à adapter selon votre environnement
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'dating_app',
  port: parseInt(process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Création du pool de connexions
const pool = mysql.createPool(dbConfig);

// Classe pour gérer les opérations de base de données
export class DatabaseService {
  // Authentification
  static async authenticateUser(email: string, passwordHash: string) {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      
      // L'utilisateur n'existe pas
      if (!Array.isArray(rows) || rows.length === 0) {
        return null;
      }
      
      const user = rows[0] as any;
      
      // Dans une véritable implémentation, vous devriez comparer le hash du mot de passe
      // avec celui stocké dans la base de données en utilisant bcrypt
      // Ceci est simplifié pour l'exemple
      if (user.password_hash === passwordHash) {
        // Ne pas renvoyer le mot de passe dans la réponse
        const { password_hash, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }
      
      return null;
    } catch (error) {
      console.error('Error authenticating user:', error);
      throw error;
    }
  }
  
  // Création d'un utilisateur
  static async createUser(userData: {
    email: string;
    passwordHash: string;
    username?: string;
    dateOfBirth?: string;
    gender?: string;
    lookingFor?: string;
    bio?: string;
    location?: string;
  }) {
    try {
      const { email, passwordHash, username, dateOfBirth, gender, lookingFor, bio, location } = userData;
      
      const [result] = await pool.execute(
        `INSERT INTO users 
         (email, password_hash, username, date_of_birth, gender, looking_for, bio, location) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [email, passwordHash, username || null, dateOfBirth || null, gender || null, 
         lookingFor || null, bio || null, location || null]
      );
      
      const insertResult = result as mysql.ResultSetHeader;
      
      if (insertResult.affectedRows === 1) {
        // Récupérer l'utilisateur créé
        const [rows] = await pool.execute(
          'SELECT * FROM users WHERE id = ?',
          [insertResult.insertId]
        );
        
        if (Array.isArray(rows) && rows.length > 0) {
          const user = rows[0] as any;
          // Ne pas renvoyer le mot de passe dans la réponse
          const { password_hash, ...userWithoutPassword } = user;
          return userWithoutPassword;
        }
      }
      
      throw new Error('Failed to create user');
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
  
  // Récupérer le profil d'un utilisateur
  static async getUserProfile(userId: number) {
    try {
      const [userRows] = await pool.execute(
        'SELECT * FROM users WHERE id = ?',
        [userId]
      );
      
      if (!Array.isArray(userRows) || userRows.length === 0) {
        return null;
      }
      
      const user = userRows[0] as any;
      const { password_hash, ...userWithoutPassword } = user;
      
      // Récupérer les photos de l'utilisateur
      const [photoRows] = await pool.execute(
        'SELECT * FROM user_photos WHERE user_id = ? ORDER BY is_primary DESC',
        [userId]
      );
      
      const photos = Array.isArray(photoRows) ? photoRows : [];
      
      return {
        ...userWithoutPassword,
        photos
      };
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  }
  
  // Test de connexion à la base de données
  static async testConnection() {
    try {
      const connection = await pool.getConnection();
      console.log('Database connection successful');
      connection.release();
      return true;
    } catch (error) {
      console.error('Error connecting to database:', error);
      return false;
    }
  }
}

export default DatabaseService;
