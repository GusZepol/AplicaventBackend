const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.dbConnection);
        console.log("Conexion a la base de datos realizada correctamente");
    } catch (error) {
        console.log(error);
        throw new Error("Error al inicializar base de datos");
    }
};

module.exports = {
    dbConnection,
};
