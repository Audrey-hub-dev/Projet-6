/**
 * Ce fichier est l'application utilisant Express, il permet de donner suite aux requêtes envoyées 
 * par le frontend. 
 */


const express = require('express');

//utilisation du module 'helmet' pour la sécurité en protégeant l'application de certaines vulnérabilités
// il sécurise nos requêtes HTTP, sécurise les en-têtes, contrôle la prélecture DNS du navigateur, empêche le détournement de clics
// et ajoute une protection XSS mineure 
const helmet = require('helmet');

const app = express();

app.use(helmet());


//importation mongoose 
const mongoose = require('mongoose');

//importation de path pour utiliser le dossier images
const path = require('path');

const saucesRoutes = require('./routes/sauces'); 
//importation du fichier user.js du dossier routes afin par la suite d'enregistrer les routes 
const userRoutes = require('./routes/user');

// connexion à mongoDB
mongoose.connect('mongodb+srv://audreyv:paris@cluster0.flvp6.mongodb.net/Cluster0?retryWrites=true&w=majority' , 

  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


//gestion des CORS pour que le frontend et le backend puissent communiquer entre eux
app.use((req, res, next) => {
  //les ressources peuvent être partagées depuis n'importe quelle origine
  res.setHeader('Access-Control-Allow-Origin', '*');
  //les en-têtes qui seront utilisés après la pré-vérification cross-origin pour donner l'autorisation
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  //les méthodes autorisées pour les requêtes HTTP
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  //autorisation du serveur à envoyer des scripts pour la page visitée
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
});


//pour analyser le corps de la requête 
app.use(express.json());

//permet de se servir du dossier images lors d'une requête 
app.use('/images', express.static(path.join(__dirname, 'images'))); 

//enregistrer les routes du fichier user.js, routes liées à l'authentification attendues par le frontend
app.use('/api/auth', userRoutes); 

app.use('/api/sauces', saucesRoutes); 

module.exports = app;