const express = require('express');
const router = express.Router();
const {
  getAllEmployers,
  getEmployerWithStudents,
} = require('../controllers/employer.controller');
const authenticate = require('../middleware/authMiddleware');

router.use(authenticate);

router.get('/', getAllEmployers);

router.get('/:id', getEmployerWithStudents);

module.exports = router;
