const express = require('express');
const app = express();

//importation mongoose 
const mongoose = require('mongoose');

//importation du fichier user.js du dossier routes afin par la suite d'enregistrer les routes 
const userRoutes = require('./routes/user');

// connexion à mongoDB
mongoose.connect('mongodb+srv://audreyv:paris@cluster0.flvp6.mongodb.net/Cluster0?retryWrites=true&w=majority' , 

  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

/*
app.use((req, res) => {
    res.json ({/*message: 'votre requête a bien été reçue !' */
  /*});
})
*/

//gestion des CORS pour que le frontend et le backend puissent communiquer entre eux
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });



//pour analyser le corps de la requête 
app.use(express.json());

//enregistrer les routes du fichier user.js, routes liées à l'authentification attendues par le frontend
app.use('/api/auth', userRoutes); 


module.exports = app;