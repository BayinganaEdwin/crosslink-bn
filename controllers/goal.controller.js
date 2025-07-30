const { InternshipGoal, User } = require('../models');

exports.createGoal = async (req, res) => {
  try {
    const { title, description, startDate, endDate, comment } = req.body;
    const studentId = req.user.id;

    const goal = await InternshipGoal.create({
      title,
      description,
      startDate,
      comment,
      endDate,
      studentId,
    });

    return res.status(201).json(goal);
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Failed to create goal', detail: err.message });
  }
};

exports.getAllGoals = async (req, res) => {
  try {
    const role = req.user.role;
    let goals;

    if (role === 'student') {
      goals = await InternshipGoal.findAll({
        where: { studentId: req.user.id },
        include: [{ model: User, attributes: ['id', 'name', 'email'] }],
        order: [['createdAt', 'DESC']],
      });
    } else if (role === 'employer' || role === 'school') {
      goals = await InternshipGoal.findAll({
        include: [{ model: User, attributes: ['id', 'name', 'email'] }],
        order: [['createdAt', 'DESC']],
      });
    } else {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized role',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Goals retrieved successfully',
      count: goals.length,
      data: goals,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch goals',
      error: err.message,
    });
  }
};

exports.getGoalById = async (req, res) => {
  try {
    const goal = await InternshipGoal.findByPk(req.params.id, {
      include: [User],
    });

    if (!goal) return res.status(404).json({ error: 'Goal not found' });

    return res.status(200).json({
      success: true,
      message: 'Goal retrieved successfully',
      data: goal,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Failed to fetch goal', detail: err.message });
  }
};

exports.updateGoal = async (req, res) => {
  try {
    const goal = await InternshipGoal.findByPk(req.params.id);

    if (!goal) return res.status(404).json({ error: 'Goal not found' });

    await goal.update(req.body);
    return res.json(goal);
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Failed to update goal', detail: err.message });
  }
};

exports.deleteGoal = async (req, res) => {
  try {
    const goal = await InternshipGoal.findByPk(req.params.id);
    if (!goal) return res.status(404).json({ error: 'Goal not found' });

    await goal.destroy();
    return res.json({ message: 'Goal deleted' });
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Failed to delete goal', detail: err.message });
  }
};
