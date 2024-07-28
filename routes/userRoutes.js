const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.put('/:id', userController.editUser);
router.delete('/:id', userController.deletUserById);
router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);

module.exports = router;