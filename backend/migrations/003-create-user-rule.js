'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User_Rules', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull:false,
        references: {
          model: 'users', // <<< Note, its table's name, not object name
          key: 'id'
          },
        },
      rule_id: {
        type: Sequelize.UUID,
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