'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM('student', 'employer', 'school'),
      allowNull: false,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.InternshipGoal, { foreignKey: 'studentId' });
    User.hasMany(models.Reflection, { foreignKey: 'studentId' });
    User.hasMany(models.Feedback, { foreignKey: 'employerId' });
  };

  return User;
};
