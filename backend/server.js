//importation du package HTTP natif de Node et utilisation pour créer un serveur
const http = require('http');

//importation du fichier app.js
const app = require('./app');

app.set('port', process.env.PORT || 3000);

/*fonction qui sera exécutée à chaque appel effectué vers ce serveur. 
Cette fonction reçoit les objets request et response en tant qu'arguments. 
On utilise la méthode end de la réponse pour renvoyer une réponse de type string à l'appelant. 
*/
const server = http.createServer(app);

/*on configure le serveur pour qu'il écoute soit la variable d'environnement du port, soit le port 3000.
Ensuite on exécute nodemon server dans le backend. 
*/
server.listen(process.env.PORT || 3000);