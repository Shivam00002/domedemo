const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/find-by-user', homeController.findByUser);
router.post('/update-users', homeController.updateUsers);

module.exports = router;