'use strict';
module.exports = (sequelize, DataTypes) => {
  const sendMessage = sequelize.define('sendMessages', {
    id:{ type: 'INTEGER' ,primaryKey:true} ,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    contantMessage: DataTypes.STRING
  }, {});
  sendMessage.associate = function(models) {
    // associations can be defined here
  };
  return sendMessage;
};