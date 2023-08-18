const tiendaCTl = {}

const orm = require('../Database/dataBase.orm')
const sql = require('../Database/dataBase.sql')

tiendaCTl.mostrar = (req, res) => {
    res.render('tienda/agregar');
}



module.exports = tiendaCTl;