require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const clientRouter = require("./routes/clientRoutes");
const employeeRouter = require("./routes/employeeRoutes");
const managerRouter = require("./routes/managerRoutes");
const reparationRouter = require("./routes/reparationRoutes");
const piecesRouter = require("./routes/piecesRoutes");
const appointmentRouter = require("./routes/appointmentRoutes");
const app = express();
const cors = require('cors');

// Limiter la taille de la requête à 50 Mo (par exemple)
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));  // pour JSON
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));  // pour URL-encoded


const PORT = process.env.PORT || 5000;
function run() {
    connectDB();
    app.use(cors());
    app.use(express.json());
    app.use('/api/clients', clientRouter);
    app.use('/api/employees', employeeRouter);
    app.use('/api/managers', managerRouter);
    app.use('/api/reparations', reparationRouter);
    app.use('/api/pieces', piecesRouter);
    app.use('/api/appointments', appointmentRouter);
    app.listen(PORT, () => {
        console.log(`Serveur en écoute sur le port ${PORT}`);
    });
};


module.exports = { run }
