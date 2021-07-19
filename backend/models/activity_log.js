'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity_Log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Activity_Log.init({
    user_id: DataTypes.INTEGER,
    activityType: DataTypes.ENUM('add', 'update', 'delete'),
    tableName: DataTypes.STRING,
    oldRecord: DataTypes.TEXT,
    newRecord: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Activity_Log',
  });
  return Activity_Log;
};