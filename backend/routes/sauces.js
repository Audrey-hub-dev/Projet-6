/**
 * Ce fichier gère les routes pour les sauces.
 */

const express = require('express');
const router = express.Router(); 


const saucesCtrl = require('../controllers/sauces'); 

//importation du middleware d'authentification
const auth = require('../middleware/auth'); 

//importation du middleware multer
const multer = require('../middleware/multer-config');

//application de l'authentification à toutes les routes 
router.get /*possibilité de mettre use aussi à la place 
de get*/('/', auth, saucesCtrl.getAllSauces);
//création
router.post('/' , auth, multer, saucesCtrl.createSauce);
//obtenir
router.get('/:id' ,auth,  saucesCtrl.getOneSauce); 
//mise à jour
router.put('/:id', auth, multer, saucesCtrl.modifySauce); 
//suppression 
router.delete('/:id', auth,  saucesCtrl.deleteSauce); 


module.exports = router;
