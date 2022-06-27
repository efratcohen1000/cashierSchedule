'use strict';
module.exports = (sequelize, DataTypes) => {
  const inlayWorks = sequelize.define('inlayWorks', {
    idEmp: DataTypes.STRING,
    levelOfInq: DataTypes.STRING,
    day: DataTypes.STRING,
    inlayType: DataTypes.STRING,
    prefer: DataTypes.STRING,

  }, {});
  inlayWorks.associate = function(models) {
    // associations can be defined here
  };
  return inlayWorks;
};