
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const { DatabaseService } = require('./dist/services/databaseService');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Middleware d'authentification
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Non autorisé' });
  }
  
  // Dans une implémentation réelle, vous vérifieriez le JWT ici
  // Simplifié pour l'exemple
  try {
    const userId = parseInt(Buffer.from(token, 'base64').toString().split(':')[0]);
    req.userId = userId;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token invalide' });
  }
};

// Routes d'authentification
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis' });
    }
    
    // Dans une vraie application, vous utiliserez bcrypt pour vérifier le mot de passe
    const passwordHash = await bcrypt.hash(password, 10); // Simulation
    
    const user = await DatabaseService.authenticateUser(email, passwordHash);
    
    if (!user) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }
    
    // Créer un token (simplifié)
    const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64');
    
    res.json({
      user,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, username } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis' });
    }
    
    // Hasher le mot de passe
    const passwordHash = await bcrypt.hash(password, 10);
    
    const user = await DatabaseService.createUser({
      email,
      passwordHash,
      username
    });
    
    // Créer un token (simplifié)
    const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64');
    
    res.status(201).json({
      user,
      token
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Route profil utilisateur
app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;
    const profile = await DatabaseService.getUserProfile(userId);
    
    if (!profile) {
      return res.status(404).json({ error: 'Profil non trouvé' });
    }
    
    res.json(profile);
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Test de connexion à la base de données
app.get('/api/health', async (req, res) => {
  const isConnected = await DatabaseService.testConnection();
  
  if (isConnected) {
    res.json({ status: 'ok', database: 'connected' });
  } else {
    res.status(500).json({ status: 'error', database: 'disconnected' });
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur API démarré sur le port ${PORT}`);
});

// Gestion des erreurs non interceptées
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
