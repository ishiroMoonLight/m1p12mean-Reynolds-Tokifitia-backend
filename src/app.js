require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const app = express();
const clientRouter = require("./routes/clientRoutes");
const employeeRouter = require("./routes/employeeRoutes");
const managerRouter = require("./routes/managerRoutes");

const PORT = process.env.PORT || 5000;
function run() {
    connectDB();
    app.use(express.json());
    app.use('/api/clients', clientRouter);
    app.use('/api/employees', employeeRouter);
    app.use('/api/managers', managerRouter);
    app.listen(PORT, () => {
        console.log(`Serveur en écoute sur le port ${PORT}`);
    });
};


module.exports = {run}
