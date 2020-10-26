const express = require('express');
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');

const routes = express.Router(); // Objetivo específico para rotas

// routes.get('/', (req, res) =>  { // função que recebe requisição e resposta
//     // req = parâmetros que vem na requisição (URL: www.site.com/?param1=Pedro&param2=Guerra)
//     // res = resposta enviada ao cliente
//     return res.json({message: `Hello ${req.query.name}`});
// });

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', DislikeController.store);

module.exports = routes; // expõe essa informação de dentro do arquivo