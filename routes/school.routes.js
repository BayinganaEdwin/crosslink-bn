const express = require('express');
const router = express.Router();
const {
  getSchoolDashboardStats,
  getRecentActivity,
  getAllStudentsProgress,
} = require('../controllers/school.controller');

const authenticate = require('../middleware/authMiddleware');

router.use(authenticate);

router.get('/dashboard-stats', authenticate, getSchoolDashboardStats);
router.get('/dashboard-activities', authenticate, getRecentActivity);
router.get('/dashboard-students', authenticate, getAllStudentsProgress);

module.exports = router;
