const { Schema, model } = require('mongoose');

const EstadoVentaSchema = Schema({
    name: {
        type: String,
        required: true
    },
},{
    collection: "estadosVenta"
});

module.exports = model('EstadosVenta', EstadoVentaSchema);