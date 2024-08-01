const { param, body, query } = require('express-validator');
const client = require('../db.js');

const genres = [
    "",
    "accion",
    "plataformas",
    "shooter",
    "lucha",
    "beat'em up",
    "sigilo",
    "supervivencia",
    "ritmo",
    "battle royale",
    "aventura",
    "metroidvania",
    "novela-visual",
    "puzzles",
    "jrpg",
    "rpg",
    "arpg",
    "mmorpg",
    "rts",
    "estrategia",
    "simulador de vida",
    "simulador de conduccion",
    "simulador",
    "deportes",
    "terror",
    "gacha",
    "casual"
];

const rows = [
    "id",
    "tittle",
    "developer",
    "release"
]

const validGenre = (value) => {
    if (!genres.includes(value)) {
        throw new Error(`Not a valid genre, should one of these ${genres}.`);
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

const validTittle = async (value) => {
    const gameCheck = await client.query('SELECT * FROM games WHERE tittle = $1', [value]);

    if (gameCheck.rows.length > 0) {
        throw new Error(`The game  ${value} already exists.`);
    }

    return true;
}

const idParamSchema = [
    param('id')
        .notEmpty()
        .withMessage(`Product ID is required.`),
];

const tittleParamSchema = [
    param('tittle')
        .notEmpty()
        .withMessage(`Tittle is required.`)
        .isLength({ min: 3, max: 50 })
        .withMessage('Tittle must be at least 3 characters long, and not exceed 50 characters.')
];

const newGameBodySchema = [
    body('tittle')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('Tittle name is required.')
        .isLength({ min: 4, max: 50 })
        .withMessage('Tittle must be at least 4 characters long, and not exceed 50 characters.')
        .custom(validTittle),
    body('genre')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('Genre is required.')
        .isLength({ min: 3, max: 25 })
        .withMessage('Game genre must be at least 3 characters long, and not exceed 25 characters.')
        .custom(validGenre),
    body('developer')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('Developer is required.')
        .isLength({ min: 3, max: 25 })
        .withMessage('Game developer must be at least 3 characters long, and not exceed 25 characters.'),
    body('release')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('Date of release is required.')
        .isDate({ format: "YYYY-MM-DD" })
        .withMessage('Date of release must be a date format like: YYYY-MM-DD.'),
    body('user_id')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('The user_id is required.')
];

const editGameSchema = [
    body('tittle')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('Tittle name is required')
        .isLength({ min: 4, max: 50 })
        .withMessage('Tittle must be at least 4 characters long, and not exceed 50 characters.'),
    body('genre')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('Genre is required.')
        .isLength({ min: 3, max: 25 })
        .withMessage('Game genre must be at least 3 characters long, and not exceed 25 characters.')
        .custom(validGenre),
    body('developer')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('Developer is required.')
        .isLength({ min: 3, max: 25 })
        .withMessage('Game developer must be at least 3 characters long, and not exceed 25 characters.'),
    body('release')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('Date of release is required.')
        .isDate({ format: "DD-MM-YYYY" })
        .withMessage('Date of release must be a date format like: DD-MM-YYYY.'),
    body('user_id')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('The user_id is required.'),
    body('active')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('Game state is required.')
        .isBoolean()
        .withMessage('Game state must be a boolean value.')
];

const filterGameSchema = [
    query('page')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('Page name is required.')
        .isInt({ min: 1 })
        .withMessage('Page must be a number and greater than 0.'),
    query('genreFilter')
        .escape()
        .trim()
        .isLength({ max: 25 })
        .withMessage('Game genre must not exceed 25 characters.')
        .custom(validGenre),
    query('rowFilter')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('Row to be filtered is required.')
        .isLength({ max: 10 })
        .withMessage('validRow must not exceed 10 characters.')
        .custom(validRow),
    query('orderFilter')
        .escape()
        .trim()
        .notEmpty()
        .withMessage('Order filter is required.')
        .custom(valirdOrder)
];

module.exports = {
    idParamSchema,
    tittleParamSchema,
    newGameBodySchema,
    editGameSchema,
    filterGameSchema
}