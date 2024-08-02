const { param, body, query } = require('express-validator');
const client = require('../db.js');

const postTypes = [
    "",
    "opinion",
    "analisis",
    "critica",
    "spoiler",
    "teoria"
]

const rows = [
    "id",
    "date"
]

const typeFilter = (value) => {
    if (!postTypes.includes(value)) {
        throw new Error(`Not a valid type, should one of these ${postTypes}.`);
    }
    return true;
}

const validRow = (value) => {
    if (!rows.includes(value)) {
        throw new Error(`Not a valid row, should one of these ${rows}.`);
    }
    return true;
}

const valirdOrder = (value) => {
    if (value !== "ASC" && value !== "DESC") {
        throw new Error(`Not a valid order, should be ASC for ascendent or DESC for descendent order.`);
    }
    return true;
}

const idParamSchema = [
    param('id')
        .notEmpty()
        .withMessage(`Product ID is required.`),
];

const filterPostsSchema = [
    query('id')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('Game id is required.')
        .isInt({ min: 1 })
        .withMessage('Id must be a number and greater than 0.'),
    query('page')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('Page name is required.')
        .isInt({ min: 1 })
        .withMessage('Page must be a number and greater than 0.'),
    query('typeFilter')
        .escape()
        .trim()
        .isLength({ max: 25 })
        .withMessage('Post type must not exceed 25 characters.')
        .custom(typeFilter),
    query('rowFilter')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('Row to be filtered is required.')
        .isLength({ max: 10 })
        .withMessage('Row must not exceed 10 characters.')
        .custom(validRow),
    query('orderFilter')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('Order filter is required.')
        .custom(valirdOrder)
];

const editPostSchema = [
    body('post_type')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('Post type is required.')
        .isLength({ max: 25 })
        .withMessage('Post type must not exceed 25 characters.')
        .custom(typeFilter),
    body('content')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('Content is required.')
        .isLength({ min: 10, max: 250 })
        .withMessage('Content must be greater than 10 characters and not exceed 250 characters.'),
    body('user_id')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('User ID is required.')
        .isInt()
        .withMessage('User ID must be a number.'),
    body('game_id')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('Game ID is required.')
        .isInt()
        .withMessage('Game ID must be a number.'),
    body('active')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('Post state is required.')
        .isBoolean()
        .withMessage('Post state must be a boolean value.')
];

const createPostSchema = [
    body('post_type')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('Post type is required.')
        .isLength({ max: 25 })
        .withMessage('Post type must not exceed 25 characters.')
        .custom(typeFilter),
    body('content')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('Content is required.')
        .isLength({ min: 10, max: 250 })
        .withMessage('Content must be greater than 10 characters and not exceed 250 characters.'),
    body('user_id')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('User ID is required.')
        .isInt()
        .withMessage('User ID must be a number.'),
    body('game_id')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('Game ID is required.')
        .isInt()
        .withMessage('Game ID must be a number.')
];

module.exports = {
    idParamSchema,
    filterPostsSchema,
    editPostSchema,
    createPostSchema,
}