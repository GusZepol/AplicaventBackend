const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    picture: {
        type: String
    },
    rol: {
        type: Schema.Types.ObjectId,
        ref: "Rol",
        default: "61910739451c678d6cd62983",
        required: true,
    },
    status: {
        type: Schema.Types.ObjectId,
        ref: "EstadosUsuario",
        default: "61910635451c678d6cd62978",
        required: true,
    },

},{
    collection: "usuarios"
});

module.exports = model('Usuario', UsuarioSchema);