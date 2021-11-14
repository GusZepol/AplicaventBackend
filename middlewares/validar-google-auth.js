const { response } = require("express");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
    "565445927496-o1vusmmnecj23atpgu4r4rnkmrudjmde.apps.googleusercontent.com"
);

const validarGoogleAuth = (req, res = response, next) => {
    let token = "";
    token = req.headers["x-acces-token"] || req.headers["authorization"];
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No se ha proporcionado un token valido",
        });
    }

    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
    }

    try {
        client
            .verifyIdToken({
                idToken: token,
                audience:
                    "565445927496-o1vusmmnecj23atpgu4r4rnkmrudjmde.apps.googleusercontent.com",
            })
            .then((response) => {
                const { sub, name, email, picture } = response.payload;
                req.uid = sub;
                req.name = name;
                req.email = email;
                req.picture = picture;
                next();
            })
            .catch((err) => {
                console.log(err);
                return res.status(401).json({
                    ok: false,
                    msg: "Token invalido",
                });
            });
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: "Token invalido",
        });
    }
};

module.exports = {
    validarGoogleAuth,
};
