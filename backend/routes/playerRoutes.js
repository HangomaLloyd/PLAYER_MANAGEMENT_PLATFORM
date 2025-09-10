const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');
const { protect } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(protect);

router.get('/', playerController.getPlayers);
router.post('/', playerController.createPlayer);
router.get('/:id', playerController.getPlayer);
router.put('/:id', playerController.updatePlayer);
router.delete('/:id', playerController.deletePlayer);

module.exports = router;
