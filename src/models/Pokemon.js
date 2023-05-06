const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  sequelize.define("Pokemon",{
    id:{
       type:DataTypes.UUID,  // alfanumerico 
       defaultValue: DataTypes.UUIDV4, // este crea un numero aleatorio
       primaryKey: true,
       
    },
    name:{
       type:DataTypes.STRING,
       allowNull:false,
       unique: true,
    },
    img:{
       type:DataTypes.STRING
    },
    hp:{
       type:DataTypes.STRING,
       allowNull:false,
    },
    attack:{
       type:DataTypes.STRING,
       allowNull:false,
    },
    defense:{
       type:DataTypes.STRING,
       allowNull:false,
    },
    speed:{
       type:DataTypes.STRING,
       allowNull:false,
    }
 },{
    timestamps:false // tercert algumento de difene, la fecha de creacion ñe
 } )
};
//  (\__/)
// (o^.^o)
// \_(")_/