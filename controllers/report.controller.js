const { InternshipGoal, Reflection, User } = require('../models');
const { Op } = require('sequelize');

exports.getGoalCompletion = async (req, res) => {
  try {
    const goals = await InternshipGoal.findAll({
      include: [{ model: User, attributes: ['id', 'name', 'email'] }],
    });

    const formatted = goals.map((goal) => ({
      studentName: goal.User.name,
      goalTitle: goal.title,
      status: goal.status,
      startDate: goal.startDate,
      endDate: goal.endDate,
    }));
    if (formatted.length === 0) {
      return res.status(404).json({
        message: 'No goals found',
      });
    }
    res.status(200).json({
      message: 'Goal completion report generated',
      count: formatted.length,
      data: formatted,
    });
  } catch (err) {
    res.status(500).json({
      error: 'Failed to generate goal report',
      detail: err.message,
    });
  }
};

exports.getWeeklyReflections = async (req, res) => {
  try {
    const reflections = await Reflection.findAll({
      include: [{ model: User, as: 'student', attributes: ['id', 'name'] }],
    });

    const grouped = reflections.reduce((acc, reflection) => {
      const week = reflection.week ? `Week ${reflection.week}` : 'Unknown Week';

      if (!acc[week]) acc[week] = [];
      acc[week].push({
        student: reflection.student.name,
        status: reflection.status,
        content: reflection.content,
      });
      return acc;
    }, {});

    if (Object.keys(grouped).length === 0) {
      return res.status(404).json({
        message: 'No weekly reflections found',
      });
    }
    res.status(200).json({
      message: 'Weekly reflections summary generated',
      count: Object.keys(grouped).length,
      data: grouped,
    });
  } catch (err) {
    res.status(500).json({
      error: 'Failed to fetch reflection summary',
      detail: err.message,
    });
  }
};

exports.getFeedbackLogs = async (req, res) => {
  try {
    const reflectionsWithFeedback = await Reflection.findAll({
      where: {
        feedback: {
          [Op.ne]: null,
        },
      },
      include: [{ model: User, as: 'student', attributes: ['id', 'name'] }],
      order: [['week', 'ASC']],
    });

    const formatted = reflectionsWithFeedback.map((reflection) => ({
      studentName: reflection.student?.name || 'Unknown Student',
      reflectionWeek: reflection.week,
      feedbackContent: reflection.feedback,
      reflectionStatus: reflection.status,
    }));

    if (formatted.length === 0) {
      return res.status(404).json({
        message: 'No reflections with feedback found.',
      });
    }

    res.status(200).json({
      message: 'Reflections with feedback summary generated successfully.',
      count: formatted.length,
      data: formatted,
    });
  } catch (err) {
    console.error('Error fetching reflections with feedback:', err);
    res.status(500).json({
      error: 'Failed to fetch reflections with feedback.',
      detail: err.message,
    });
  }
};
