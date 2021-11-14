const { response } = require("express");
const Ventas = require("../models/Venta");
const Producto = require("../models/Producto");
const Estado = require("../models/EstadosVenta");
const Usuario = require("../models/Usuario");

const getEstados = async (req, res = response) => {
    try {
        const estados = await Estado.find();
        res.status(200).json({
            ok: true,
            msg: "Lista de estados",
            estados,
        });
    } catch (error) {
        console.log(error);
    }
};

const getVentas = async (req, resp = response) => {
    try {
        const ventas = await Ventas.find()
            .populate("producto")
            .populate("idVendedor", "name")
            .populate("estado", "name")
            .sort({ id: 1 });

        resp.status(200).json({
            ok: true,
            msg: "Lista de Ventas",
            ventas,
        });
    } catch (error) {
        console.log(error);
    }
};

const buscarVenta = async (req, res = response) => {
    const regex = /^[0-9]*$/;
    const onlyNumbers = regex.test(req.body.ventaSearch);

    if (onlyNumbers && req.body.ventaSearch !== "") {
        const ventNameoID = parseInt(req.body.ventaSearch);
        try {
            const venta = await Ventas.find({ id: ventNameoID })
                .populate("producto")
                .populate("idVendedor", "name")
                .populate("estado", "name")
                .sort({ id: 1 });
            if (!venta || venta.length === 0) {
                const venta = await Ventas.find({
                    cedulaCliente: ventNameoID,
                })
                    .populate("producto")
                    .populate("idVendedor", "name")
                    .populate("estado", "name")
                    .sort({ id: 1 });
                if (!venta || venta.length === 0) {
                    res.status(404).json({
                        ok: false,
                        msg: "No existe un venta con el id o cedula indicada",
                    });
                } else {
                    res.status(202).json({
                        ok: true,
                        msg: "Lista de ventas",
                        venta,
                    });
                }
            } else {
                res.status(202).json({
                    ok: true,
                    msg: "Lista de ventas",
                    venta,
                });
            }
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: "error al buscar la venta",
            });
        }
    } else {
        let ventNameoID = req.body.ventaSearch;
        ventNameoID =
            ventNameoID.charAt(0).toUpperCase() + ventNameoID.slice(1);
        try {
            const venta = await Ventas.find({
                nombreCliente: ventNameoID,
            })
                .populate("producto")
                .populate("idVendedor", "name")
                .populate("estado", "name")
                .sort({ id: 1 });
            if (!venta || venta.length === 0) {
                res.status(404).json({
                    ok: false,
                    msg: "No existe una venta con el nombre de cliente indicado",
                });
            } else {
                res.status(202).json({
                    ok: true,
                    msg: "Lista de ventas",
                    venta,
                });
            }
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: "error al buscar la venta",
            });
        }
    }
};

const crearVenta = async (req, resp = response) => {
    let fecha = new Date();
    let fechaActual =
        fecha.getFullYear() +
        "-" +
        (fecha.getMonth() + 1) +
        "-" +
        fecha.getDate();
    try {
        let contador = 1;
        const ventas = await Ventas.find().sort({ id: 1 });
        ventas.forEach((venta) => {
            if (venta.id === contador) {
                contador++;
            }
        });
        const newVenta = {
            id: contador,
            cedulaCliente: req.body.cedulaCliente,
            nombreCliente: req.body.nombreCliente,
            producto: req.body.producto,
            cantidad: req.body.cantidad,
            idVendedor: req.body.idVendedor,
            fechaDeVenta: fechaActual,
        };
        const venta = new Ventas(newVenta);
        const ventaSave = await venta.save();
        resp.status(201).json({
            ok: true,
            msg: "Venta creada con exito",
            ventaSave,
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: "Error al crear Venta",
        });
    }
};

const actualizarVenta = async (req, resp = response) => {
    const VentId = req.body.id;
    try {
        const Venta = await Ventas.findOne({ id: VentId });

        if (!Venta) {
            crearVenta(req, resp);
        } else {
            const VentaGuardada = await Ventas.findByIdAndUpdate(
                Venta._id,
                req.body,
                { new: true }
            );

            resp.json({
                ok: true,
                msg: "Venta actualizada exitosamente",
                usuario: VentaGuardada,
            });
        }
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: "error al actualizar Venta",
        });
    }
};

module.exports = {
    getVentas,
    crearVenta,
    actualizarVenta,
    buscarVenta,
    getEstados,
};
