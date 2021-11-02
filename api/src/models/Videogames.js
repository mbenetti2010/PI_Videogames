const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogames', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {  
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {   
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    platforms: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    released: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: true, 
      defaultValue:true
    }

  });
};
