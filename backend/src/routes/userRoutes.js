const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/find-all', userController.findAll);
router.get('/find-by-home', userController.findByHome);

module.exports = router;