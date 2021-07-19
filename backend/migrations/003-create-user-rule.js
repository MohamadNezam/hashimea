'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User_Rules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'users', // <<< Note, its table's name, not object name
          key: 'id'
          },
        },
      rule_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'rules', // <<< Note, its table's name, not object name
          key: 'id'
      },
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User_Rules');
  }
};