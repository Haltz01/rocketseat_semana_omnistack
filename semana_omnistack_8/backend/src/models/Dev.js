const { Schema, model } = require('mongoose'); // Esse tipo de importação { Schema, ...} permite importar dependências específicas de dentro do pacote

const DevSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    bio: String,
    avatar: {
        type: String,
        required: true,
    },
    likes: [{ // isso está atuando como uma chave estrangeira (se fosse bd relacional)
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],
}, {
    timestamps: true, // gera automaticamente dados sobre a data da última atualização e a data de criada
});

module.exports = model('Dev', DevSchema);