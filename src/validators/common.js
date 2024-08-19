const { param } = require('express-validator');

const userIDParamSchema = [
    param('user_id')
        .notEmpty()
        .withMessage(`User ID is required.`)
        .isInt()
        .withMessage(`User ID must be an integer.`),
];

module.exports = {
    userIDParamSchema,
}