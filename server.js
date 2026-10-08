const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Protection par mot de passe (Basic Auth)
app.use((req, res, next) => {
    const USERNAME = 'admin';
    const PASSWORD = 'ChangerCeMotDePasse123!';

    const authHeader = req.headers.authorization || '';
    const token = authHeader.split(' ')[1] || '';
    const [login, password] = Buffer.from(token, 'base64').toString().split(':');

    if (login === USERNAME && password === PASSWORD) {
        return next();
    }

    res.set('WWW-Authenticate', 'Basic realm="TOUT-AFFAIRE - Site en construction"');
    res.status(401).send('Accès restreint. Veuillez saisir vos identifiants pour accéder au site.');
});

app.use(express.static(path.join(__dirname, 'public')));

const ORDERS_FILE = path.join(__dirname, 'data', 'orders.json');

if (!fs.existsSync(path.join(__dirname, 'data'))) {
    fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
}

if (!fs.existsSync(ORDERS_FILE)) {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2));
}

app.post('/api/orders', (req, res) => {
    try {
        const orderData = req.body;
        
        if (!orderData || !orderData.customer || !orderData.customer.email) {
            return res.status(400).json({ success: false, message: 'Données de commande invalides.' });
        }

        const newOrder = {
            id: 'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
            createdAt: new Date().toISOString(),
            status: 'PENDING',
            ...orderData
        };

        const fileData = fs.readFileSync(ORDERS_FILE, 'utf-8');
        const orders = JSON.parse(fileData || '[]');
        orders.push(newOrder);
        fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));

        console.log(`[COMMANDE REÇUE] ID: ${newOrder.id} - Client: ${newOrder.customer.firstName} ${newOrder.customer.lastName}`);

        return res.status(200).json({
            success: true,
            message: 'Votre commande a bien été reçue et enregistrée !',
            orderId: newOrder.id
        });
    } catch (error) {
        console.error('Erreur traitement commande:', error);
        return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
});

app.get('/api/orders', (req, res) => {
    try {
        const fileData = fs.readFileSync(ORDERS_FILE, 'utf-8');
        const orders = JSON.parse(fileData || '[]');
        res.json({ success: true, count: orders.length, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erreur de lecture des commandes.' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Serveur Monoproduit démarré sur http://localhost:${PORT}`);
});
