const { response } = require("express");
const Users = require("../models/Usuario");
const Roles = require("../models/Rol");
const Estados = require("../models/EstadosUsuario");

const getUsers = async (req, res = response) => {
    const users = await Users.find().populate("rol", "name").populate("status", "name");

    res.status(200).json({
        ok: true,
        msg: "Lista de Usuariossss",
        users,
    });
};

const getRoles = async (req, res = response) => {
    const roles = await Roles.find();
    res.status(200).json({
        ok: true,
        msg: "Lista de roles",
        roles,
    });
};

const getEstados = async (req, res = response) => {
    const estados = await Estados.find();
    res.status(200).json({
        ok: true,
        msg: "Lista de estados",
        estados,
    });
};

const updateUsers = async (req, res = response) => {
    const userId = req.params.id;
    try {
        const user = await Users.findById(userId);
        if (!user) {
            res.status(404).json({
                ok: false,
                msg: "El id del usuario no coincide en la base de datos",
            });
        }

        const userUpdated = await Users.findByIdAndUpdate(userId, req.body, {
            new: true,
        });

        res.status(200).json({
            ok: true,
            msg: "Usuario actualizado de manera exitosa",
            usuario: userUpdated,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "error al actualizar",
        });
    }
};

module.exports = {
    getUsers,
    updateUsers,
    getRoles,
    getEstados,
};
