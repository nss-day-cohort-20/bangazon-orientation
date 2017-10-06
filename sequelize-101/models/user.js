'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING
  }, {timestamps: false});

  User.associate = function(models) {
    User.belongsToMany(models.Show, {
      as: 'Favorites',
      through: 'UserFavorites'
    });
  };

  User.prototype.getFullName = function() {
    return `${this.first_name} ${this.last_name}`
  }

  return User;
};
