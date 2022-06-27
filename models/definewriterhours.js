'use strict';
module.exports = (sequelize, DataTypes) => {
  const defineWriterHours = sequelize.define('defineWriterHours', {
    day:DataTypes.STRING,
    date: DataTypes.DATE,
    startTime: DataTypes.TIME,
    endTime: DataTypes.TIME,
    numberCashier: DataTypes.INTEGER,
    numberMainCashier: DataTypes.INTEGER
  }, {});
  defineWriterHours.associate = function(models) {
    // associations can be defined here
  };
  return defineWriterHours;
};