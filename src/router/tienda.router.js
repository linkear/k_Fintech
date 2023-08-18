const express = require('express');
const rutas = express.Router()

const { mostrar, mandar, lista, traer, actualizar } = require('../controller/tienda.controller')
const { isLoggedIn } = require('../lib/auth')

rutas.get('/agregar/:id', isLoggedIn, mostrar)

module.exports = rutas
