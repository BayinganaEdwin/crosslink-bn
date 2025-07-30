const { User, InternshipGoal, Reflection } = require('../models');

exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.findAll({
      where: { role: 'student' },
      attributes: ['id', 'name', 'email', 'role'],
    });

    return res.status(200).json({
      message: 'Students fetched successfully',
      count: students.length,
      data: students,
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Failed to fetch students',
      detail: err.message,
    });
  }
};

exports.getStudentProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await User.findOne({
      where: { id, role: 'student' },
      attributes: ['id', 'name', 'email', 'role'],
      include: [
        {
          model: InternshipGoal,
          attributes: [
            'id',
            'title',
            'description',
            'startDate',
            'endDate',
            'status',
            'comment',
          ],
        },
        {
          model: Reflection,
          attributes: ['id', 'week', 'content', 'status'],
        },
      ],
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    return res.status(200).json({
      message: 'Student profile fetched successfully',
      data: student,
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Failed to fetch student profile',
      detail: err.message,
    });
  }
};
