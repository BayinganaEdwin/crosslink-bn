const { Reflection, User } = require('../models');

exports.createReflection = async (req, res) => {
  try {
    const { week, content } = req.body;

    const reflection = await Reflection.create({
      studentId: req.user.id,
      week,
      content,
      status: 'Pending',
    });

    res.status(201).json({ message: 'Reflection created', data: reflection });
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Failed to create reflection', detail: err.message });
  }
};

exports.getReflections = async (req, res) => {
  try {
    let reflections;

    if (req.user.role === 'student') {
      reflections = await Reflection.findAll({
        where: { studentId: req.user.id },
      });
    } else if (req.user.role === 'employer' || req.user.role === 'school') {
      reflections = await Reflection.findAll({ include: [User] });
    }

    res.json({
      message: 'Reflections fetched',
      count: reflections.length,
      data: reflections,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Failed to fetch reflections', detail: err.message });
  }
};

exports.updateReflectionFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { feedback, status } = req.body;

    const reflection = await Reflection.findByPk(id);

    if (!reflection) {
      return res.status(404).json({ error: 'Reflection not found' });
    }

    await reflection.update({
      feedback,
      status: status || 'Reviewed',
    });

    res.json({ message: 'Reflection updated', data: reflection });
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Failed to update reflection', detail: err.message });
  }
};

exports.deleteReflection = async (req, res) => {
  try {
    const { id } = req.params;

    const reflection = await Reflection.findByPk(id);

    if (!reflection) {
      return res.status(404).json({ error: 'Reflection not found' });
    }

    await reflection.destroy();

    res.status(200).json({ message: 'Reflection deleted successfully' });
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Failed to delete reflection', detail: err.message });
  }
};
