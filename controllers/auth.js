const { response } = require("express");
const { generarJWT } = require("../helpers/jwt");
const Usuario = require("../models/Usuario");
const Rol = require("../models/Rol");
const EstadosUsuario = require("../models/EstadosUsuario");

const validarUsuarioGoogle = async (req, resp = response) => {
    const { name, email, picture } = req;
    try {
        let usuario = await Usuario.findOne({
            email,
        })
            .populate("rol")
            .populate("status");
        if (usuario) {
            if (
                usuario.status.name === "No autorizado" ||
                usuario.status.name === "Pendiente"
            ) {
                resp.status(401).json({
                    ok: false,
                    msg: "El usuario aun no ha sido autorizado por el administrador",
                });
            } else {
                const token = await generarJWT(usuario.id, usuario.name);
                resp.json({
                    ok: true,
                    msg: "Estas autorizado",
                    uid: usuario.id,
                    name: usuario.name,
                    picture: usuario.picture,
                    rol: usuario.rol.name,
                    status: usuario.status.name,
                    token,
                });
            }
        } else {
            usuario = new Usuario({ name, email, picture });
            await usuario.save();
            resp.status(201).json({
                ok: true,
                msg: "Usuario creado con exito",
            });
        }
    } catch (error) {
        console.log(error);
    }
};

const revalidarToken = async (req, res = response) => {
    const { uid, name } = req;
    resp.json({
        ok: true,
        token,
    });
};

module.exports = {
    validarUsuarioGoogle,
    revalidarToken,
};
