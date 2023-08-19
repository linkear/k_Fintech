const express = require('express');
const rutas = express.Router()
const { mostrar, mandar, traer } = require ('../controller/factura.controller')

const { isLoggedIn } = require('../lib/auth')

rutas.get('/factura/agregar/:id', isLoggedIn, mostrar)
rutas.post('/factura/agregar/:id', isLoggedIn, mandar)

module.exports = rutas 