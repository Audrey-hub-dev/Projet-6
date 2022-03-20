/**
 * Ce fichier est le middleware d'authentification, il permet la création de routes en toute
 * sécurité. 
 */

//utilisation du package jwt pour vérifier les token
const jwt = require('jsonwebtoken');

//exportation du middleware d'authentification 
module.exports = (req, res, next) => {
  try {
      /*récupération du token dans le header, dans network, headers, 
      authorization, la chaine de caractères est le token*/
    const token = req.headers.authorization.split(' ')[1/*deuxième 
    élément de ce tableau qui est a chaine de caractères*/];
    //décoder le token
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'/*cette clé
    doit correspondre à la clé dans la fonction login*/);
    //récupération de l'user id qui est dans le token 
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
        //ne pas authentifier la requête
      throw 'Invalid user ID';
    } else {// si tout va bien on peut passer la requête au prochain middleware
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};