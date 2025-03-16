
#!/bin/bash

# Script de déploiement pour l'application de rencontre sur Ubuntu Server 24.04
echo "Début du déploiement de l'application de rencontre..."

# Vérifier si le script est exécuté en tant que root
if [[ $EUID -ne 0 ]]; then
   echo "Ce script doit être exécuté en tant que root" 
   exit 1
fi

# Variables - modifier selon votre configuration
APP_NAME="dating-app"
APP_DIR="/var/www/$APP_NAME"
MYSQL_USER="dating_app_user"
MYSQL_PASSWORD="YourStrongPasswordHere"  # Changez ceci!
MYSQL_DATABASE="dating_app"
DOMAIN="votre-domaine.com"  # Changez ceci!

# Mise à jour du système
echo "Mise à jour du système..."
apt update && apt upgrade -y

# Installation des dépendances
echo "Installation des dépendances..."
apt install -y nodejs npm mysql-server nginx certbot python3-certbot-nginx

# Configuration de MySQL
echo "Configuration de MySQL..."
mysql -e "CREATE DATABASE IF NOT EXISTS $MYSQL_DATABASE CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -e "CREATE USER IF NOT EXISTS '$MYSQL_USER'@'localhost' IDENTIFIED BY '$MYSQL_PASSWORD';"
mysql -e "GRANT ALL PRIVILEGES ON $MYSQL_DATABASE.* TO '$MYSQL_USER'@'localhost';"
mysql -e "FLUSH PRIVILEGES;"

# Importer le schéma
echo "Importation du schéma de base de données..."
mysql $MYSQL_DATABASE < src/database/schema.sql

# Création du répertoire de l'application
echo "Création du répertoire de l'application..."
mkdir -p $APP_DIR
chown -R $USER:$USER $APP_DIR

# Copie des fichiers de l'application
echo "Copie des fichiers de l'application..."
cp -r * $APP_DIR/

# Installation des dépendances Node.js
echo "Installation des dépendances Node.js..."
cd $APP_DIR
npm install
npm run build

# Configuration de Nginx
echo "Configuration de Nginx..."
cat > /etc/nginx/sites-available/$APP_NAME << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    root $APP_DIR/dist;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Activer le site et redémarrer Nginx
ln -sf /etc/nginx/sites-available/$APP_NAME /etc/nginx/sites-enabled/
systemctl restart nginx

# Configuration de Certbot pour HTTPS
echo "Configuration de HTTPS avec Certbot..."
certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN

# Création du service systemd pour l'API
echo "Création du service systemd..."
cat > /etc/systemd/system/$APP_NAME.service << EOF
[Unit]
Description=$APP_NAME API service
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=$APP_DIR
ExecStart=/usr/bin/node server.js
Restart=always
Environment=NODE_ENV=production
Environment=DB_HOST=localhost
Environment=DB_USER=$MYSQL_USER
Environment=DB_PASSWORD=$MYSQL_PASSWORD
Environment=DB_NAME=$MYSQL_DATABASE

[Install]
WantedBy=multi-user.target
EOF

# Activer et démarrer le service
systemctl enable $APP_NAME
systemctl start $APP_NAME

echo "Déploiement terminé avec succès!"
echo "Votre application est accessible à l'adresse https://$DOMAIN"
echo ""
echo "IMPORTANTES ÉTAPES SUIVANTES:"
echo "1. Modifiez le mot de passe MySQL dans ce script"
echo "2. Configurez le domaine correct dans ce script"
echo "3. Vérifiez les paramètres de pare-feu avec 'sudo ufw status'"
echo "4. Si nécessaire, autorisez HTTP/HTTPS avec 'sudo ufw allow 80/tcp' et 'sudo ufw allow 443/tcp'"
