'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      user_type_id:{
        type: Sequelize.UUID,
        references: {
          model: 'user_types', // <<< Note, its table's name, not object name
          key: 'id'
          },
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true, 
      },
      password: {
        type: Sequelize.STRING
      },
      mobilePhone: {
        type: Sequelize.BIGINT,
        allowNull: false,
      }, status: {
        type: Sequelize.ENUM('Active', 'InActive'),
        allowNull: false
      }, verified: {
        type: Sequelize.ENUM('Yes', 'No'),
        allowNull: false
      }, token: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Users');
  }
};