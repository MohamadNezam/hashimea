'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Rule,{through: 'User_Rule',foreignKey:'user_id'})
      //this.hasMany(models.User_Rule,{ foreignKey: 'user_id'})
      // define association here
    }
  };
  User.init({
    user_type_id: DataTypes.UUID,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    mobilePhone: DataTypes.BIGINT,
    status:DataTypes.ENUM('Active', 'InActive'),
    verified:DataTypes.ENUM('Yes', 'No'),
    token:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};