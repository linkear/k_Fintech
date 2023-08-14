const { Sequelize } = require("sequelize");

const { MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE, MYSQLPORT, MYSQL_URI, } = require("../keys");

const sequelize = new Sequelize(MYSQLDATABASE, MYSQLUSER, MYSQLPASSWORD, {
	host: MYSQLHOST,
	port: MYSQLPORT,
	dialect: 'mysql'
});

//const sequelize = new Sequelize(MYSQL_URI);

sequelize.authenticate()
	.then(() => {
		console.log("conectado");
	})
	.catch((err) => {
		console.log("no se conecto");
	});

sequelize.sync({ force: false })
	.then(() => {
		console.log("tablas sincronizadas");
	});

	const tiendaModel = require('../models/tienda') 
	const dueñoModel = require('../models/dueño') 
	const facturaModel = require('../models/factura') 
	const formaPagoModel = require('../models/forma_pago') 
	const clienteModel = require('../models/cliente'); 
	const detalleFacturaModel = require("../models/detalle_factura");
	const detalleTotalModel = require("../models/detalle_total");
	
	//sincronia
	
	const tienda =  tiendaModel(sequelize, Sequelize)
	const dueño = dueñoModel(sequelize, Sequelize)
	const factura = facturaModel(sequelize, Sequelize)
	const forma_pago = formaPagoModel(sequelize, Sequelize)
	const cliente = clienteModel(sequelize, Sequelize)
	const detalle_factura = detalleFacturaModel(sequelize, Sequelize)
	const detalle_total = detalleTotalModel(sequelize, Sequelize)
	
	//relacion tienda-dueño
	dueño.hasMany(tienda)
	tienda.belongsTo(dueño)
	
	//relacion tienda-factura
	tienda.hasMany(factura)
	factura.belongsTo(tienda)
	
	//relacion factura-cliente
	factura.hasMany(cliente)
	cliente.belongsTo(factura)
	
	//relacion factura-forma_pago
	factura.hasMany(forma_pago)
	forma_pago.belongsTo(factura)
	
	//relacion factura-detalle_factura
	factura.hasMany(detalle_factura)
	detalle_factura.belongsTo(factura)
	
	//relacion factura-detalle_total
	factura.hasMany(detalle_total)
	detalle_total.belongsTo(factura)
	
	
	module.exports = {
		dueño,
		tienda,
		factura,
		forma_pago,
		cliente,
		detalle_factura,
		detalle_total
	};
