const { Schema, model } = require("mongoose");

const VentaSchema = Schema(
    {
        id: {
            type: Number,
            unique: true,
            required: true
        },
        producto: {
            type: Schema.Types.ObjectId,
            ref: "Producto",
            required: true,
        },
        cantidad: {
            type: Number,
            required: true,
        },
        cedulaCliente: {
            type: Number,
            required: true
        },
        nombreCliente: {
            type: String,
            required: true
        },
        idVendedor: {
            type: Schema.Types.ObjectId,
            ref: "Usuario",
            required: true,
        },
        fechaDeVenta: {
            type: String,
            required: true
        },
        estado: {
            type: Schema.Types.ObjectId,
            ref: "EstadosVenta",
            default: "619106d0451c678d6cd6297b",
            required: true,
        },
    },
    {
        collection: "ventas",
    }
);

module.exports = model("Venta", VentaSchema);