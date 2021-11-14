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
            default: "6190a8da2c44e3756847fad1",
            required: true,
        },
    },
    {
        collection: "ventas",
    }
);

module.exports = model("Venta", VentaSchema);