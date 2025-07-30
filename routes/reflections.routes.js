const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const controller = require('../controllers/reflections.controller');

router.post('/', auth, controller.createReflection);
router.get('/', auth, controller.getReflections);
router.patch('/:id', auth, controller.updateReflectionFeedback);
router.delete('/:id', auth, controller.deleteReflection);

module.exports = router;
