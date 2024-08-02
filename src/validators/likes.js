const { body } = require('express-validator');

const controlLikesSchema = [   
    body('user_id')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('User ID is required.')
        .isInt()        
        .withMessage('User ID must be a number.'),
    body('likes_id')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('Likes ID is required.')
        .isInt()        
        .withMessage('Likes ID must be a number.')
];

module.exports = {
    controlLikesSchema,
}