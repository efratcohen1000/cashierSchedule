'use strict';
module.exports = (sequelize, DataTypes) => {
  const passwordLogin = sequelize.define('passwordLogin', {
    password: DataTypes.STRING,
    roleNumber: DataTypes.STRING
  }, {});
  passwordLogin.associate = function(models) {
    // associations can be defined here
  };
  return passwordLogin;
};