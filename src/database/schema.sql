
-- Base de données pour l'application de rencontre
-- Structure des tables principales

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  username VARCHAR(50),
  date_of_birth DATE,
  gender VARCHAR(20),
  looking_for VARCHAR(20),
  bio TEXT,
  location VARCHAR(100),
  latitude FLOAT,
  longitude FLOAT,
  max_distance INT DEFAULT 30,
  show_profile BOOLEAN DEFAULT TRUE,
  notifications_enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des photos des utilisateurs
CREATE TABLE IF NOT EXISTS user_photos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  photo_url VARCHAR(255) NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table des matchs entre utilisateurs
CREATE TABLE IF NOT EXISTS matches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id_1 INT NOT NULL,
  user_id_2 INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id_1) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id_2) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE (user_id_1, user_id_2)
);

-- Table des likes (swipes)
CREATE TABLE IF NOT EXISTS likes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  liked_user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (liked_user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE (user_id, liked_user_id)
);

-- Table des messages
CREATE TABLE IF NOT EXISTS messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  match_id INT NOT NULL,
  sender_id INT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE CASCADE,
  FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Données d'exemple - Utilisateurs
INSERT INTO users (email, password_hash, username, date_of_birth, gender, looking_for, bio, location)
VALUES
('julie@example.com', '$2b$10$6KHM.7HEKvL2q.8wk9vB8eQh9Z/F1riFNnkgmPXc0bRGgyyRX8LLG', 'Julie', '1999-05-15', 'Femme', 'Homme', 'Passionnée de voyage et d\'aventures. J\'aime les sorties en plein air, la bonne cuisine et les conversations intéressantes.', 'Paris, France'),
('thomas@example.com', '$2b$10$6KHM.7HEKvL2q.8wk9vB8eQh9Z/F1riFNnkgmPXc0bRGgyyRX8LLG', 'Thomas', '1998-08-22', 'Homme', 'Femme', 'Amateur de randonnée et de photographie. À la recherche de nouvelles rencontres et expériences.', 'Lyon, France'),
('emma@example.com', '$2b$10$6KHM.7HEKvL2q.8wk9vB8eQh9Z/F1riFNnkgmPXc0bRGgyyRX8LLG', 'Emma', '2000-03-10', 'Femme', 'Tous', 'J\'adore l\'art, la musique et les soirées entre amis. Étudiante en design.', 'Marseille, France');

-- Note: Les mots de passe sont tous 'password123' hashés avec bcrypt
