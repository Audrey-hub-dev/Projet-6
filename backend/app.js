/**
 * Ce fichier est l'application utilisant Express, il permet de donner suite aux requêtes envoyées 
 * par le frontend. 
 */


const express = require('express');
const app = express();

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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
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