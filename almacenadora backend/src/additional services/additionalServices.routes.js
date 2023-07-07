'use strict'

const express = require('express');
const api = express.Router();
const serviceController = require('./additionalServices.controller');
const { isAdmin } = require('../services/authenticated')

//Rutas Privadas [ADMIN]
api.get('/test', serviceController.test)
api.get('/get', serviceController.getServices)
api.post('/add', serviceController.addServices)
api.put('/update/:id', serviceController.updateService)

module.exports = api;