'use strict';
module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define('Feedback', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    reflectionId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    employerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    comment: DataTypes.TEXT,
  });

  Feedback.associate = (models) => {
    Feedback.belongsTo(models.User, {
      foreignKey: 'employerId',
      as: 'employer',
    });
    Feedback.belongsTo(models.Reflection, { foreignKey: 'reflectionId' });
  };

  return Feedback;
};
