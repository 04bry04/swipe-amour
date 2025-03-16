
# Application de Rencontre

Cette application de rencontre est une application web complète avec une interface utilisateur React et une backend API Node.js connectée à une base de données MySQL.

## Prérequis

- Node.js 18+ et npm
- MySQL 8+
- Ubuntu Server 24.04 (pour le déploiement)

## Structure de l'application

- **Frontend**: React, Tailwind CSS, Shadcn/UI
- **Backend**: Node.js, Express
- **Base de données**: MySQL

## Développement local

1. Clonez le dépôt
2. Installez les dépendances avec `npm install`
3. Configurez MySQL localement
4. Importez le schéma de base de données avec `mysql -u root -p < src/database/schema.sql`
5. Exécutez le serveur d'API avec `node server.js`
6. Exécutez l'application frontend avec `npm run dev`

## Déploiement sur Ubuntu Server 24.04

1. Transférez tous les fichiers sur votre serveur
2. Modifiez les variables dans `deploy.sh` selon votre configuration:
   - `APP_NAME`: Nom de votre application
   - `MYSQL_USER`: Utilisateur MySQL
   - `MYSQL_PASSWORD`: Mot de passe MySQL (important: changez-le!)
   - `MYSQL_DATABASE`: Nom de la base de données
   - `DOMAIN`: Votre nom de domaine

3. Rendez le script exécutable:
   ```
   chmod +x deploy.sh
   ```

4. Exécutez le script de déploiement en tant que root:
   ```
   sudo ./deploy.sh
   ```

Le script effectuera automatiquement:
- L'installation des dépendances système
- La configuration de MySQL
- L'importation du schéma de base de données
- La configuration de Nginx avec HTTPS
- La mise en place d'un service systemd pour l'API

## Configuration

### Variables d'environnement

Les variables d'environnement suivantes peuvent être configurées:

- `DB_HOST`: Hôte MySQL (par défaut: localhost)
- `DB_USER`: Utilisateur MySQL
- `DB_PASSWORD`: Mot de passe MySQL
- `DB_NAME`: Nom de la base de données
- `DB_PORT`: Port MySQL (par défaut: 3306)
- `PORT`: Port du serveur API (par défaut: 3000)

### Sécurité

Cette application utilise:
- HTTPS avec Let's Encrypt
- Hachage des mots de passe avec bcrypt
- Communication API sécurisée avec tokens

## Maintenance

### Sauvegarde de la base de données

Pour sauvegarder la base de données:

```
mysqldump -u root -p dating_app > backup_$(date +%Y%m%d).sql
```

### Mise à jour de l'application

1. Arrêtez le service: `sudo systemctl stop dating-app`
2. Mettez à jour les fichiers
3. Redémarrez le service: `sudo systemctl start dating-app`

## Structure de la base de données

La base de données contient les tables suivantes:
- `users`: Profils des utilisateurs
- `user_photos`: Photos des utilisateurs
- `matches`: Correspondances entre utilisateurs
- `likes`: Swipes positifs
- `messages`: Messages échangés entre utilisateurs

## Dépannage

### Vérifier l'état du service API
```
sudo systemctl status dating-app
```

### Consulter les logs
```
sudo journalctl -u dating-app -f
```

### Vérifier la connexion à la base de données
```
curl http://localhost:3000/api/health
```
