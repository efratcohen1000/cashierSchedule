'use strict';
module.exports = (sequelize, DataTypes) => {
  const messageOrganizer = sequelize.define('messageOrganizer', {
    message: DataTypes.STRING
  }, {});
  messageOrganizer.associate = function(models) {
    // associations can be defined here
  };
  return messageOrganizer;
};