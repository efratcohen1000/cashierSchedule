'use strict';
module.exports = (sequelize, DataTypes) => {
  const employeeRequests = sequelize.define('employeeRequests', {
    id:{ type: 'INTEGER' ,primaryKey:true} ,
    idEmp: DataTypes.INTEGER,
  requestContent: DataTypes.STRING,
    levelUngency: DataTypes.INTEGER(0)
  }, {});
  employeeRequests.associate = function(models) {
    // associations can be defined here
  };
  return employeeRequests;
};