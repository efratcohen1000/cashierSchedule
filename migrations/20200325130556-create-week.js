'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Weeks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numCashier: {
        type: Sequelize.INTEGER
      },
      numMainCashier: {
        type: Sequelize.INTEGER
      },
      eveningNumCashier: {
        type: Sequelize.INTEGER
      },
      eveningNumMainCashier: {
        type: Sequelize.INTEGER
      },
      fridom: {
        type: Sequelize.INTEGER
      },
      freedomB: {
        type: Sequelize.INTEGER
      },
      day:{
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Weeks');
  }
};