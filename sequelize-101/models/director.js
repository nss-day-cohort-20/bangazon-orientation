'use strict';
module.exports = function(sequelize, DataTypes) {
  var Director = sequelize.define('Director', {
    name: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true
      }
    },
    gender: DataTypes.STRING,
    birth_year: DataTypes.INTEGER,
    twitter_handle: DataTypes.STRING
  }, {timestamps: false});

  Director.associate = function(models) {
    Director.hasMany(models.Show, {
      foreignKey: 'directorId'
    });
  };
  return Director;
};
