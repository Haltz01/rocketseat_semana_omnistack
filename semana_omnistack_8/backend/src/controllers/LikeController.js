const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        console.log(req.params.devId); // usuário que está recebendo o like
        console.log(req.headers.user);

        const { devId } = req.params; // id do usuário no qual você está dando like
        const { user } = req.headers; // id do usuário logado

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if (!targetDev) {
            return res.status(400).json({ error: 'Dev does not exists'}); // HTTP Codes! 400 = Bad Request
        }

        if (targetDev.likes.includes(loggedDev._id)) {
            // console.log('DEU MATCH!!');
            const loggedSocket = req.connectedUsers[user]; // usuario que deu o like
            const targetSocket = req.connectedUsers[devId]; // usuario que recebeu o like

            if (loggedSocket) { // se user está logado
                req.io.to(loggedSocket).emit('match', targetDev);
            }

            if (targetSocket) {
                req.io.to(targetSocket).emit('match', loggedDev);
            }
        }

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save(); // salva alterações no banco de dados

        return res.json(loggedDev); 
    }
};