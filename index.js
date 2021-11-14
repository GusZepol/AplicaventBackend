const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { dbConnection } = require("./database/config");


//Server
const app = express();
//Database
dbConnection();
//Server Config
app.use(cors());
app.use(express.json());
//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/ventas', require('./routes/ventas'));
app.use('/api/productos', require('./routes/productos'));
app.use('/api/usuarios', require('./routes/usuarios'));

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
