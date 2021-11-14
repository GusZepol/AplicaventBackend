const { Schema, model } = require('mongoose');

const EstadoSchema = Schema({
    name: {
        type: String,
        required: true
    },
},{
    collection: "estadosUsuario"
});

module.exports = model('EstadosUsuario', EstadoSchema);