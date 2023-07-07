'use strict'

const express = require('express');
//Logs de las solicitudes que recibe el servidor
const morgan = require('morgan');
//Aplica seguridad básica al servidor
const helmet = require('helmet');
//Aceptación de solicitudes desde otro sistema o desde la misma máquina
const cors = require('cors');
//Instancia de express
const app = express();
const port = process.env.PORT || 3500;

const accountRoutes = require('../src/account/account.routes');
const userRoutes = require('../src/user/user.routes')
const serviceRoutes = require('../src/additional services/additionalServices.routes')
const cellarRoutes = require('../src/cellar/cellar.routes');
const leaseRoutes = require('../src/lease/lease.routes')

//CONFIGURAR EL SERVIDOR HTTP DE EXPRESS
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/user', userRoutes);
app.use('/account', accountRoutes);
app.use('/cellar', cellarRoutes);
app.use('/service', serviceRoutes)
app.use('/cellar', cellarRoutes);
app.use('/lease', leaseRoutes)

//Función donde se levanta el servidor
exports.initServer = ()=>{
    app.listen(port);
    console.log(`Server http running in port ${port}`);
}