const { User, InternshipGoal, Reflection } = require('../models');

exports.getSchoolDashboardStats = async (req, res) => {
  try {
    const studentsPlaced = await User.count({ where: { role: 'student' } });

    const totalGoals = await InternshipGoal.count();
    const completedGoals = await InternshipGoal.count({
      where: { status: 'Done' },
    });

    const goalsCompletedPercentage = totalGoals
      ? Math.round((completedGoals / totalGoals) * 100)
      : 0;

    const pendingFeedback = await Reflection.count({
      where: {
        feedback: null,
      },
    });

    return res.json({
      studentsPlaced,
      goalsCompletedPercentage,
      pendingFeedback,
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Failed to fetch school dashboard stats',
      detail: err.message,
    });
  }
};

exports.getRecentActivity = async (req, res) => {
  try {
    const recentGoals = await InternshipGoal.findAll({
      include: [{ model: User }],
      order: [['updatedAt', 'DESC']],
      limit: 5,
    });

    const recentReflections = await Reflection.findAll({
      include: [
        {
          model: User,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
      order: [['createdAt', 'DESC']],
      limit: 10,
    });

    const activities = [];

    for (const goal of recentGoals) {
      if (goal.status === 'completed') {
        activities.push({
          type: 'Goal Completed',
          message: `Employer reviewed ${goal.User.name}'s goals`,
          time: goal.updatedAt,
        });
      } else {
        activities.push({
          type: 'New Goal',
          message: `${goal.User.name} submitted a new goal`,
          time: goal.createdAt,
        });
      }
    }

    console.log('recentReflections', recentReflections);

    for (const reflection of recentReflections) {
      if (reflection.feedback) {
        activities.push({
          type: 'Comment',
          message: `New comment on ${reflection.student.name}'s reflection`,
          time: reflection.updatedAt,
        });
      } else {
        activities.push({
          type: 'Reflection',
          message: `Weekly update submitted by ${reflection.student.name}`,
          time: reflection.createdAt,
        });
      }
    }

    const sorted = activities
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, 5); // Limit to 5 most recent

    return res.json(sorted);
  } catch (err) {
    return res.status(500).json({
      error: 'Failed to fetch recent activity',
      detail: err.message,
    });
  }
};

exports.getAllStudentsProgress = async (req, res) => {
  try {
    const students = await User.findAll({
      where: { role: 'student' },
      attributes: ['id', 'name', 'email'],
    });

    const results = [];

    for (const student of students) {
      const [totalGoals, goalsCompleted, reflections, pendingFeedback] =
        await Promise.all([
          InternshipGoal.count({ where: { studentId: student.id } }),
          InternshipGoal.count({
            where: { studentId: student.id, status: 'Done' },
          }),
          Reflection.count({ where: { studentId: student.id } }),
          Reflection.count({
            where: { studentId: student.id, feedback: null },
          }),
        ]);

      const status =
        totalGoals === 0 || goalsCompleted >= totalGoals * 0.6
          ? 'On Track'
          : 'Needs Attention';

      results.push({
        id: student.id,
        name: student.name,
        email: student.email,
        status,
        goalsCompleted,
        totalGoals,
        reflections,
        pendingFeedback,
      });
    }

    return res.json(results);
  } catch (err) {
    return res.status(500).json({
      error: 'Failed to fetch student progress stats',
      detail: err.message,
    });
  }
};
