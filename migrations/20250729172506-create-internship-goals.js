'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('InternshipGoals', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      studentId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      title: Sequelize.STRING,
      description: Sequelize.TEXT,
      status: {
        type: Sequelize.STRING,
        defaultValue: 'In Progress',
      },
      startDate: Sequelize.DATEONLY,
      endDate: Sequelize.DATEONLY,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('InternshipGoals');
  },
};
