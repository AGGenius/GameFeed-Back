const { param, body } = require('express-validator');
const client = require('../db.js');

const userTypes = [
    "user",
    "mod",
    "admin"
];

const validUserType = async (value) => {
    if (!userTypes.includes(value)) {
        throw new Error(`Not a valid row, should one of these ${userTypes}.`);
    }

    return true;
}

const validUserEmail = async (value) => {
    const userCheck = await client.query('SELECT * FROM users WHERE email = $1', [value]);

    if (userCheck.rows.length > 0) {
        throw new Error(`The email  ${value} already has an acount.`);
    }

    return true;
}

const idParamSchema = [
    param('id')
        .notEmpty()
        .withMessage(`Product ID is required.`),
];

const editUserSchema = [
    body('email')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('Email is required.')
        .isLength({ min: 4, max: 50 })
        .withMessage('Email must be at least 4 characters long, and not exceed 50 characters.')
        .isEmail()
        .withMessage('Must be a valid format email.'),
    body('name')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('Name is required.')
        .isLength({ min: 2, max: 25 })
        .withMessage('Name must be at least 2 characters long, and not exceed 25 characters.'),
    body('nick')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('Nick is required.')
        .isLength({ min: 2, max: 25 })
        .withMessage('Nick must be at least 2 characters long, and not exceed 25 characters.'),
    body('type')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('User type is required.')
        .custom(validUserType),
    body('active')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('The state is required.')
        .isBoolean()
        .withMessage('User state must be a boolean value.')
];

const registerUserSchema = [
    body('email')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('Email is required.')
        .isLength({ min: 4, max: 25 })
        .withMessage('Email must be at least 4 characters long, and not exceed 25 characters.')
        .isEmail()
        .withMessage('Must be a valid format email.')
        .custom(validUserEmail),
    body('password')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('Password is required.')
        .isLength({ max: 25 })
        .withMessage('Name must not exceed 25 characters.')
        .isStrongPassword()
        .withMessage("Password must contain at least 1 lowercase, uppercase, number and symbol, with al least 8 characters."),
    body('name')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('Name is required.')
        .isLength({ min: 2, max: 25 })
        .withMessage('Name must be at least 2 characters long, and not exceed 25 characters.'),
    body('nick')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('Nick is required.')
        .isLength({ min: 2, max: 25 })
        .withMessage('Nick must be at least 2 characters long, and not exceed 25 characters.')
];

const loginUserSchema = [
    body('email')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('Email is required.')
        .isLength({ min: 4, max: 25 })
        .withMessage('Email must be at least 4 characters long, and not exceed 25 characters.')
        .isEmail()
        .withMessage('Must be a valid format email.'),
    body('password')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('Password is required.')
        .isLength({ max: 25 })
        .withMessage('Name must not exceed 25 characters.')
];

module.exports = {
    idParamSchema,
    editUserSchema,
    registerUserSchema,
    loginUserSchema
}