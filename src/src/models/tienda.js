const tienda=(sequelize,type)=>{
    return sequelize.define('tiendas',{
        idTienda:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement:true 
        },
        nombreTienda: type.STRING(99),
        RUCTienda: type.STRING(99),
        dirección_martriz_tienda: type.STRING(99),
        direccion_sucursal_tienda: type.STRING(99),
        correo_electronico_tienda: type.STRING(99),
        telefono: type.STRING(99),

        crearTienda:{
            type:'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull:false
        },
        actualizarTienda:{
            type:'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull:false
        }
    }, { timestamps:false,

    });

}
module.exports = tienda