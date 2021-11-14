const { Schema, model } = require('mongoose')

const ProductoSchema = Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    descripcion: {
        type: String,
        required: true,
        unique: true
    },
    valorUnit: {
        type: Number,
        required: true
    },
    estado: {
        type: Boolean,
        required: true
    }
}, )

module.exports = model('Producto', ProductoSchema)