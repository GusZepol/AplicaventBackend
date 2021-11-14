const jwt = require("jsonwebtoken");

const generarJWT = (uid, name) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name };
        jwt.sign(
            payload,
            process.env.Secret_JWT,
            {
                expiresIn: "2h", //0.02h = 2 minutos
            },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject("No se pudo generar el token");
                }
                resolve(token);
            }
        );
    });
};

module.exports = {
    generarJWT,
};