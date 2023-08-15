const express = require('express');
const {Mostrar} = require('../controller/login.controller');
const router = express.Router();

router.get('/', Mostrar)

module.exports = router 