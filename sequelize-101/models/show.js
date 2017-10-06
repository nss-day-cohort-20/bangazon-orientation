'use strict';
module.exports = function(sequelize, DataTypes) {
  var Show = sequelize.define('Show', {
    name: DataTypes.STRING,
    network: DataTypes.STRING,
    genre: DataTypes.STRING,
    in_production: DataTypes.BOOLEAN,
  }, {timestamps: false});

  Show.associate = function(models) {
    Show.belongsTo(models.Director, {
      foreignKey: 'directorId',
      onDelete: 'CASCADE'
    });

    Show.belongsToMany(models.User, {
      through: 'UserFavorites'
    });
  };
  return Show;
};
