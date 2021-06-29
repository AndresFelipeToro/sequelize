'use strict';
module.exports = (sequelize, DataTypes) => {
  const Modulo = sequelize.define('Modulo', {
    nombreModulo: DataTypes.STRING,
    dniProfesor: DataTypes.STRING
  }, {
    paranoid: true, // SoftDelete - Debe existir la columna deletedAt
  });

  Modulo.associate = function(models) {
    // associations can be defined here
    Modulo.belongsTo(models.Profesor, {
      as: 'profesors',
      foreignKey: 'dniProfesor'
    });
  };

  return Modulo;
};