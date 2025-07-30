'use strict';

module.exports = (sequelize, DataTypes) => {
  const InternshipGoal = sequelize.define('InternshipGoal', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    studentId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'In Progress',
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY,
  });

  InternshipGoal.associate = (models) => {
    InternshipGoal.belongsTo(models.User, { foreignKey: 'studentId' });
  };

  return InternshipGoal;
};
