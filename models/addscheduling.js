'use strict';
module.exports = (sequelize, DataTypes) => {
  const addScheduling = sequelize.define('addScheduling', {
    idEmp: DataTypes.STRING,
    date: DataTypes.DATE,
    beginningTime: DataTypes.TIME,
    endTime: DataTypes.TIME
  }, {});
  addScheduling.associate = function(models) {
    // associations can be defined here
  };
  return addScheduling;
};