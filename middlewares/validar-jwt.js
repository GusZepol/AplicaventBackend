const { response } = require("express");
const jwt = require("jsonwebtoken");

const validarJwt = (req, resp = response, next) => {
    const token = req.header("x-token");

    if (!token) {
        return resp.status(401).json({
            ok: "false",
            msg: "No se ha proporcionado un token valido",
        });
    }

    try {
        const { uid, name } = jwt.verify(token, process.env.Secret_JWT);

        req.uid = uid;
        req.name = name;
    } catch (error) {
        return resp.status(401).json({
            ok: false,
            msg: "Token invalido",
        });
    }

    next();
};

module.exports = {
    validarJwt,
};
