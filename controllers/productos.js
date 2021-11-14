const { response } = require("express");
const Producto = require("../models/Producto");
const { findByIdAndUpdate, findById, findOne } = require("mongoose");

const getProductos = async (req, resp = response) => {
    try {
        const productos = await Producto.find().sort({ id: 1 });
        resp.status(200).json({
            ok: true,
            msg: "Lista de Productos",
            productos,
        });
    } catch (error) {
        resp.status(500).json({
            ok: false,
            msg: "error al obtener los productos",
        });
    }
};

const buscarProducto = async (req, res = response) => {
    const regex = /^[0-9]*$/;
    const onlyNumbers = regex.test(req.body.buscador);

    if (onlyNumbers && req.body.buscador !== "") {
        const prodNameoID = parseInt(req.body.buscador);

        try {
            const producto = await Producto.findOne({ id: prodNameoID });

            if (!producto) {
                res.status(404).json({
                    ok: false,
                    msg: "No existe un producto con el id indicado",
                });
            } else {
                res.status(202).json({
                    ok: true,
                    msg: "Lista de Productos",
                    producto,
                });
            }
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: "error al buscar el producto",
            });
        }
    } else {
        let prodNameoID = req.body.buscador;
        prodNameoID =
            prodNameoID.charAt(0).toUpperCase() + prodNameoID.slice(1);
        try {
            const producto = await Producto.findOne({
                descripcion: prodNameoID,
            });

            if (!producto) {
                res.status(404).json({
                    ok: false,
                    msg: "No existe un producto con la descripcion indicada",
                });
            } else {
                res.status(202).json({
                    ok: true,
                    msg: "Lista de Productos",
                    producto,
                });
            }
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: "error al buscar el producto",
            });
        }
    }
};

const crearProducto = async (req, res = response) => {
    try {
        let contador = 1;
        const productos = await Producto.find().sort({ id: 1 });
        productos.forEach((producto) => {
            if (producto.id === contador) {
                contador++;
            }
        });
        let descripcion = req.body.descripcion;
        descripcion =
            descripcion.charAt(0).toUpperCase() + descripcion.slice(1);
        const infoNuevoProd = {
            id: contador,
            descripcion: descripcion,
            valorUnit: req.body.valorUnit,
            estado: req.body.estado,
        };
        const producto = new Producto(infoNuevoProd);
        const productSave = await producto.save();
        res.status(201).json({
            ok: true,
            msg: "Producto creado de manera exitosa",
            productSave,
        });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({
                ok: false,
                msg: "El producto ya existe",
            });
        } else {
            res.status(500).json({
                ok: false,
                msg: "error al crear el producto",
            });
        }
    }
};

const actualizarProducto = async (req, res = response) => {
    let { descripcion } = req.body;
    descripcion = descripcion.charAt(0).toUpperCase() + descripcion.slice(1);
    try {
        if (req.body.id !== "") {
            const ProdID = parseInt(req.body.id);
            const producto = await Producto.findOne({ id: ProdID });
            if (!producto) {
                crearProducto(req, res);
            } else {
                const productoGuardado = await Producto.findByIdAndUpdate(
                    producto._id,
                    {
                        id: req.body.id,
                        descripcion: descripcion,
                        valorUnit: req.body.valorUnit,
                        estado: req.body.estado,
                    },
                    { new: true }
                );

                res.json({
                    ok: true,
                    msg: "Producto actualizado de manera exitosa",
                    productoGuardado,
                });
            }
        } else {
            crearProducto(req, res);
        }
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({
                ok: false,
                msg: "El producto ya existe",
            });
        } else {
            res.status(500).json({
                ok: false,
                msg: "error al actualizar el producto",
            });
        }
    }
};

module.exports = {
    getProductos,
    crearProducto,
    actualizarProducto,
    buscarProducto,
};
