# 🛒 Page Mono-Produit & Moteur de Checkout - TOUT-AFFAIRE

Ce dossier contient la page mono-produit officielle **Pendentif Simply Love** intégrée au serveur Node.js / Express de prise de commande.

## 📁 Structure du Projet

```
.
├── server.js                        # Serveur backend Node.js / Express
├── package.json                     # Dépendances du projet
├── .env.example                     # Variables d'environnement exemple
├── README.md                        # Documentation
├── data/
│   └── orders.json                  # Stockage automatique des commandes reçues
└── public/
    ├── index.html                   # Votre page mono-produit "Pendentif Simply Love"
    ├── checkout-engine.js           # Engine JavaScript frontend
    └── (images...)                  # Placez vos images image1.jpg à image5.jpg ici
```

## 🚀 Installation et Lancement

1. **Installer les dépendances** :
   ```bash
   npm install
   ```

2. **Démarrer le serveur** :
   ```bash
   npm start
   ```

3. **Accéder au site** :
   Ouvrez votre navigateur sur [http://localhost:3000](http://localhost:3000).

## 📩 Test de commande
Le formulaire envoie directement la commande à l'endpoint `/api/orders`, qui la stocke dans `data/orders.json`.
Vous pouvez visualiser les commandes enregistrées à l'adresse : `http://localhost:3000/api/orders`.
