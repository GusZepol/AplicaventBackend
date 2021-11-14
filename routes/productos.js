const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJwt } = require("../middlewares/validar-jwt");
const router = Router();
const {
    getProductos,
    crearProducto,
    actualizarProducto,
    buscarProducto,
} = require("../controllers/productos");

router.get("/listarProductos", validarJwt, getProductos);

router.post("/buscarProducto", validarJwt, buscarProducto);

router.post(
    "/crearProducto",
    [
        check("descripcion", "La descripcion es obligatoria").not().isEmpty(),
        check("valorUnit", "La valor unitario es obligatorio").not().isEmpty(),
        check("estado", "El estado del producto es obligatorio")
            .not()
            .isEmpty(),
        validarCampos,
    ],
    validarJwt,
    crearProducto
);

router.put(
    "/actualizarProducto",
    [
        check("descripcion", "La descripcion es obligatoria").not().isEmpty(),
        check("valorUnit", "La valor unitario es obligatorio").not().isEmpty(),
        check("estado", "El estado del producto es obligatorio")
            .not()
            .isEmpty(),
        validarCampos,
    ],
    validarJwt,
    actualizarProducto
);

module.exports = router;
