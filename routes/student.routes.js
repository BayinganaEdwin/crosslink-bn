const express = require('express');
const router = express.Router();
const {
  getAllStudents,
  getStudentProfile,
} = require('../controllers/student.controller');
const authenticate = require('../middleware/authMiddleware');

router.use(authenticate);

router.get('/', getAllStudents);
router.get('/:id', getStudentProfile);

module.exports = router;
