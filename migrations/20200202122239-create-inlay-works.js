'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('inlayWorks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idEmp: {
        type: Sequelize.STRING
      },
      prefer: {
        type: Sequelize.STRING
      },
      levelOfInq: {
        type: Sequelize.STRING
      },
      day: {
        type: Sequelize.STRING,
        allowNull: false
      },
      inlayType: {
        type: Sequelize.STRING,
        allowNull: false
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
    return queryInterface.dropTable('inlayWorks');
  }
};