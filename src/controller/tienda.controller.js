const tiendaCTl = {}

const orm = require('../Database/dataBase.orm')
const sql = require('../Database/dataBase.sql')

tiendaCTl.mostrar = (req, res) => {
    res.render('tienda/agregar');
}

tiendaCTl.mandar = async (req, res) => {
    const id = req.user.idDueño
    const { fotoTienda, nombreTienda, dueñoTienda, RUCTienda, dirección_matriz_tienda, direccion_sucursal_tienda, correo_electronico_tienda, telefono } = req.body
    const NuevoTienda = {
        fotoTienda,
        nombreTienda,
        dueñoTienda,
        RUCTienda,
        dirección_matriz_tienda,
        direccion_sucursal_tienda,
        correo_electronico_tienda,
        telefono
    }
    await orm.tienda.create(NuevoTienda)
    req.flash('success', 'Guardado con exito')
    res.redirect('/tienda/lista/' + id);
}

tiendaCTl.lista = async (req, res) => {
    const lista = await sql.query('select * from tiendas')
    res.render('tienda/lista', { lista })
}

tiendaCTl.traer = async (req, res) => {
    const ids = req.params.id
    const lista = await sql.query('select * from tiendas where idTienda = ?', [ids])
    res.render('tienda/editar', {lista})
}

tiendaCTl.actualizar = async (req, res) => {
    const id = req.user.idDueño
    const ids = req.params.id
    const { fotoTienda, nombreTienda, dueñoTienda, RUCTienda, dirección_matriz_tienda, direccion_sucursal_tienda, correo_electronico_tienda, telefono } = req.body
    const nuevaShop = {
        fotoTienda,
        dueñoTienda,
        nombreTienda,
        RUCTienda,
        dirección_matriz_tienda,
        direccion_sucursal_tienda,
        correo_electronico_tienda,
        telefono,
    }
    await orm.tienda.findOne({ where: {idTienda: ids } })
        .then(actualizar => {
            actualizar.update(nuevaShop)
            req.flash('success', 'Actualizado con extio')
            res.redirect('/tienda/lista/' + ids);
        })
}
module.exports = tiendaCTl;