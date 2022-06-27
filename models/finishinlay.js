'use strict';
module.exports = (sequelize, DataTypes) => {
  const finishInlay = sequelize.define('finishInlay', {
    day: DataTypes.INTEGER,
    idEmp: DataTypes.INTEGER,
    shift: DataTypes.INTEGER,
    color: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    state: DataTypes.INTEGER
  }, {});
  finishInlay.associate = function(models) {
    // associations can be defined here
  };
  return finishInlay;
};