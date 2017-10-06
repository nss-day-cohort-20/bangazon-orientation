'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Shows', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      network: {
        type: Sequelize.STRING
      },
      genre: {
        type: Sequelize.STRING
      },
      in_production: {
        type: Sequelize.BOOLEAN
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Shows');
  }
};
