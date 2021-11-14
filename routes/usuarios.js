const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJwt } = require("../middlewares/validar-jwt");
const { revalidarToken } = require("../controllers/auth");
const router = Router();
const {
    getUsers,
    updateUsers,
    getRoles,
    getEstados,
} = require("../controllers/usuarios");

router.get("/", validarJwt, getUsers);

router.get("/roles", validarJwt, getRoles);

router.get("/estados", validarJwt, getEstados);

router.put(
    "/:id",
    [
        check("rol", "El campo es obligatorio").not().isEmpty(),
        check("status", "El campo es obligatorio").not().isEmpty(),
        validarCampos,
    ],
    validarJwt,
    updateUsers
);

router.get("/renew", validarJwt, revalidarToken);

module.exports = router;
