'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn( 'Shows', 'directorId', {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Directors',
        key: 'id',
        as: 'directorId'
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn( 'Shows', 'directorId' );
  }
};
