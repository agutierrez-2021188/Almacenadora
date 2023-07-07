'use strict'

const express = require('express');
const api = express.Router();
const leaseController = require('./lease.controller')
const { ensureAuth, isAdmin } = require('../services/authenticated');

//Ruta de testeo
api.get('/test', leaseController.test)

//Rutas privadas
//Rutas privadas solo para administrador
api.post('/add', leaseController.add)
api.delete('/delete/:id', leaseController.delete)
api.get('/get', leaseController.get)
api.put('/update/:id', leaseController.update)

api.post('/addService/:id', leaseController.addService)
api.post('/deleteService/:id', leaseController.deleteService)

module.exports = api;