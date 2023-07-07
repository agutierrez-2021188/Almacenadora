'use strict'

const express = require('express');
const api = express.Router();
const userController = require('./user.controller');
const { ensureAuth, isAdmin } = require('../services/authenticated');

//Ruta de testeo
//Rutas públicas
api.post('/register', userController.register);
api.post('/login', userController.login);
//Rutas privadas
api.put('/update/:id', userController.update);
api.delete('/delete/:id', userController.delete);
api.get('/getUsers', userController.getUsers)
//Rutas privadas solo para administrador
api.get('/test', userController.test);
api.post('/save', userController.save);

module.exports = api;