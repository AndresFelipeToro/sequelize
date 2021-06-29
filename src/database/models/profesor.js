'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profesor = sequelize.define('Profesor', {
      nombreProfesor: DataTypes.STRING,
      direccion: DataTypes.STRING,
      telefono: DataTypes.STRING
    },{
      paranoid: true, // SoftDelete - Debe existir la columna deletedAt
    });

    Profesor.associate = function (models) {
      // associations can be defined here
      Profesor.hasMany(models.Modulo, {
        as: 'modulos',
        foreignKey: 'dniProfesor'
      })
    };
   
  return Profesor;
};
