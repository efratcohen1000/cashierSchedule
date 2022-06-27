'use strict';
module.exports = (sequelize, DataTypes) => {
  const sendPersonalMessage = sequelize.define('sendPersonalMessage', {
    IdPerson: DataTypes.INTEGER,
    message: DataTypes.STRING,
    dateSend: DataTypes.DATE
  }, {});
  sendPersonalMessage.associate = function(models) {
    // associations can be defined here
  };
  return sendPersonalMessage;
};