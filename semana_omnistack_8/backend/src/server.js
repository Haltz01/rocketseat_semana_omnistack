const express = require('express'); // Express cria um novo servidor
const mongoose = require('mongoose'); // Mongoose permite o uso de sintaxe Javascript para se comunicar com o BD
const cors = require('cors'); // permite que a aplicação seja acessada pelo React

const routes = require('./routes'); // Arquivo nosso, manda-se o path

const app = express(); // Novo servidor do express criado
const server = require('http').Server(app); // Aceita conexões websocket e http
const io = require('socket.io')(server); // require retorna uma função 

const connectedUsers = {
    
}

io.on('connection', socket => { // permite transmissão de mensagens em tempo real entre fornt e back end
    // console.log('Nova conexão', socket.id);
    const { user } = socket.handshake.query;

    connectedUsers[user] = socket.id;
});

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-7zrod.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

// Aqui é necessário usar o Expresses (app)
app.use(cors()); 
app.use(express.json());
app.use(routes); // Colocar configuração de outro arquivo em uso - como adicionar um módulo/plugin 

server.listen(3333); // Porta na qual o servidor está ouvindo
