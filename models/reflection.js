'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reflection = sequelize.define('Reflection', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    studentId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    week: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: DataTypes.TEXT,
    status: {
      type: DataTypes.ENUM('Pending', 'Reviewed'),
      defaultValue: 'Pending',
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  Reflection.associate = (models) => {
    Reflection.belongsTo(models.User, {
      foreignKey: 'studentId',
      as: 'student',
    });
  };

  return Reflection;
};
