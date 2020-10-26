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

        loggedDev.dislikes.push(targetDev._id);

        await loggedDev.save(); // salva alterações no banco de dados

        return res.json(loggedDev); 
    }
};