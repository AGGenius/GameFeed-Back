const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { asyncErrorHandler } = require('../middlewares/errors.js');
const { validate } = require('../middlewares/validation.js');
const { validLoginData, validUserData } = require('../middlewares/users.js');
const { idParamSchema, editUserSchema, editUserSelfSchema, editUserSelfPassfSchema, registerUserSchema, loginUserSchema } = require('../validators/users.js');

router.get('/', asyncErrorHandler(userController.getUsers));
router.get('/:id', idParamSchema, validate, asyncErrorHandler( userController.getUserByID));
router.post('/login', loginUserSchema, validate, validLoginData, asyncErrorHandler(userController.loginUser));
router.put('/:id', idParamSchema, editUserSchema, validate, asyncErrorHandler(userController.editUser));
router.put('/editInfo/:id', idParamSchema, editUserSelfSchema, validate, validUserData, asyncErrorHandler(userController.editUserByUser));
router.put('/editInfoPass/:id', idParamSchema, editUserSelfPassfSchema, validate, validUserData, asyncErrorHandler(userController.editUserByUser));
router.delete('/:id', idParamSchema, validate, asyncErrorHandler(userController.deletUserById));
router.post('/register', registerUserSchema, validate, asyncErrorHandler(userController.registerUser));

module.exports = router;