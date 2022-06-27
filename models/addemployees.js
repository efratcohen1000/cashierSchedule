'use strict';
module.exports = (sequelize, DataTypes) => {
  const addEmployees = sequelize.define('addEmployees', {
    id:{ type: 'INTEGER' ,primaryKey:true} ,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    state: DataTypes.INTEGER(0),
    counter: DataTypes.INTEGER(0),
    color: DataTypes.STRING,
  }, {});
  addEmployees.associate = function(models) {
    // associations can be defined here
  };
  return addEmployees;
};