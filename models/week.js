'use strict';
module.exports = (sequelize, DataTypes) => {
  const Week = sequelize.define('Week', {
    numCashier: DataTypes.INTEGER,
    numMainCashier: DataTypes.INTEGER,
    eveningNumCashier: DataTypes.INTEGER,
    eveningNumMainCashier: DataTypes.INTEGER,
    fridom: DataTypes.INTEGER,
    freedomB:DataTypes.INTEGER,
    day:DataTypes.INTEGER
  }, {});
  Week.associate = function(models) {
    // associations can be defined here
  };
  return Week;
};