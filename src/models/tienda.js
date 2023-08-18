const tienda=(sequelize,type)=>{
    return sequelize.define('tiendas',{
        idTienda:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement:true 
        },
        fotoTienda: type.BLOB,
        nombreTienda: type.STRING(99),
        dueñoTienda: type.STRING(99),
        RUCTienda: type.STRING(99),
        dirección_matriz_tienda: type.STRING(99),
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