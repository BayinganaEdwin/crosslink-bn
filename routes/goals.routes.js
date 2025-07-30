const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goal.controller');
const authenticate = require('../middleware/authMiddleware');

router.use(authenticate);

router.post('/', goalController.createGoal);
router.get('/', goalController.getAllGoals);
router.get('/:id', goalController.getGoalById);
router.patch('/:id', goalController.updateGoal);
router.delete('/:id', goalController.deleteGoal);

module.exports = router;
