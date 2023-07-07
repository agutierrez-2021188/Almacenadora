'use strict'

const express = require('express');
const api = express.Router();
const cellarController = require('./cellar.controller');
const { ensureAuth, isAdmin } = require('../services/authenticated');

//Rutas privadas solo para administrador
api.post('/add', cellarController.addCellar);
api.get('/get', cellarController.getCellars);
api.get('/get/:id',  cellarController.getCellar);
api.put('/update/:id',  cellarController.updateCellar);
api.delete('/delete/:id', cellarController.deleteCellar);
api.post('/search', cellarController.searchCellar);
api.post('/searchAv', cellarController.searchCellarAvailability);
api.post('/searchNo', cellarController.searchCellarNoAvailability)

module.exports = api;