const express = require('express');
const router = express.Router();
const {
  getGoalCompletion,
  getWeeklyReflections,
  getFeedbackLogs,
} = require('../controllers/report.controller');
const authenticate = require('../middleware/authMiddleware');

router.use(authenticate);

router.get('/goals', getGoalCompletion);

router.get('/reflections', getWeeklyReflections);

router.get('/feedback', getFeedbackLogs);

module.exports = router;
