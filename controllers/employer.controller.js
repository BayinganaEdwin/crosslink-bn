const { User, Reflection } = require('../models');

exports.getAllEmployers = async (req, res) => {
  try {
    const employers = await User.findAll({
      where: { role: 'employer' },
      attributes: ['id', 'name', 'email', 'role'],
    });

    return res.status(200).json({
      message: 'Employers fetched successfully',
      count: employers.length,
      data: employers,
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Failed to fetch employers',
      detail: err.message,
    });
  }
};

exports.getEmployerWithStudents = async (req, res) => {
  try {
    const { id } = req.params;

    const employer = await User.findOne({
      where: { id, role: 'employer' },
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: Reflection,
          include: [
            {
              model: User,
              as: 'student',
              attributes: ['id', 'name', 'email'],
            },
          ],
        },
      ],
    });

    if (!employer) {
      return res.status(404).json({ error: 'Employer not found' });
    }

    return res.status(200).json({
      message: 'Employer details fetched',
      data: employer,
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Failed to fetch employer details',
      detail: err.message,
    });
  }
};
