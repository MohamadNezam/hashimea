'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Rule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     // this.belongsTo(models.User, { foreignKey: 'user_id'});
      //this.belongsTo(models.Rule, { foreignKey: 'rule_id'});
    }
  };
  User_Rule.init({
    user_id: {
      type:DataTypes.UUID,
      references: 'users', // <<< Note, its table's name, not object name
      referencesKey: 'id' // <<< Note, its a column name
    },
    rule_id: {
      type:DataTypes.UUID,
      references: 'rules', // <<< Note, its table's name, not object name
      referencesKey: 'id' // <<< Note, its a column name
    }
  }, {
    sequelize,
    modelName: 'User_Rule',
  });
  return User_Rule;
};