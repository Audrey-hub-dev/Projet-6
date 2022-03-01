const express = require('express');
const app = express();

//importation mongoose 
const mongoose = require('mongoose');

// connexion à mongoDB
mongoose.connect('mongodb+srv://audreyv:paris@cluster0.flvp6.mongodb.net/Cluster0?retryWrites=true&w=majority' , 

  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


/*app.use((req, res) => {
    res.json ({message: 'votre requête a bien été reçue !' });
})
*/

//gestion des CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });



//pour analyser le corps de la requête 
app.use(express.json());

module.exports = app;