//utilisation de express pour créer un routeur
const express = require('express');

//utilisation de la fonction router de express
const router = express.Router();

//configuration du router pour associer les fonctions du contrôleur aux différentes routes
const userCtrl = require('../controllers/user');

//création de deux routes post en précisant l'utilisation de la fonction signup et de la fonction login
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

//exportation du routeur pour ensuite l'importer dans app.js
module.exports = router;