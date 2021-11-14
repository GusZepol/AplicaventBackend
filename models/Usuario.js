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
        default: "6190a9562c44e3756847fada",
        required: true,
    },
    status: {
        type: Schema.Types.ObjectId,
        ref: "EstadosUsuario",
        default: "6190a89a2c44e3756847face",
        required: true,
    },

},{
    collection: "usuarios"
});

module.exports = model('Usuario', UsuarioSchema);