const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJwt } = require("../middlewares/validar-jwt");
const router = Router();
const {
    getVentas,
    crearVenta,
    actualizarVenta,
    buscarVenta,
    getEstados,
} = require("../controllers/ventas");

router.get("/listarVentas", validarJwt, getVentas);

router.get("/estados", validarJwt, getEstados);

router.post("/buscarVenta", validarJwt, buscarVenta);

router.post(
    "/crearVenta",
    [
        check("producto", "El nombre del producto es obligatorio")
            .not()
            .isEmpty(),
        check("cantidad", "La cantidad es obligatoria").not().isEmpty(),
        check("cedulaCliente", "La cedula del cliente es obligatoria")
            .not()
            .isEmpty(),
        check("nombreCliente", "El nombre del cliente es obligatorio")
            .not()
            .isEmpty(),
        check("idVendedor", "El id del vendedor es obligatorio")
            .not()
            .isEmpty(),
        validarCampos,
    ],
    validarJwt,
    crearVenta
);

router.post(
    "/actualizarVenta",
    [
        check("id", "El codigo de venta es obligatorio").not().isEmpty(),
        check("cedulaCliente", "La cedula del cliente es obligatoria")
            .not()
            .isEmpty(),
        check("nombreCliente", "El nombre del cliente es obligatorio")
            .not()
            .isEmpty(),
        check("producto", "El producto es obligatorio").not().isEmpty(),
        check("cantidad", "La cantidad es obligatoria").not().isEmpty(),
        check("fechaDeVenta", "La fecha de venta es obligatoria")
            .not()
            .isEmpty(),
        check("estado", "El estado de la venta es obligatorio").not().isEmpty(),
        validarCampos,
    ],
    validarJwt,
    actualizarVenta
);

module.exports = router;
