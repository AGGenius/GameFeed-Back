const client = require('../db.js');
const { createLike } = require('./likesController.js')

const createGame = async (req, res) => {
    const { tittle, genre, developer, release, user_id } = req.body;

    const newGame = await client.query(`INSERT INTO games (active, tittle, genre, developer, release, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`, [false, tittle, genre, developer, release, user_id]);
    createLike(newGame.rows[0].id, 0)
    res.json({ estado: "Juego creado correctamente" });
}

const getGames = async (req, res) => {
    const result = await client.query('SELECT * FROM games WHERE id != 0 AND active = true ORDER BY id');
    res.json(result.rows);
}

const getGameById = async (req, res) => {
    const { id } = req.params;
    const result = await client.query('SELECT * FROM games WHERE id= $1', [id]);

    if (result.rows.length > 0) {
        res.json(result.rows);
    } else {
        res.json({ estado: "Juego no encontrado" })
    }
};

const getGamesByFilter = async (req, res) => {
    const { page, genreFilter, rowFilter, orderFilter } = req.body;
    let newfilter;
    let baseQuery;

    if (genreFilter) {
        newfilter = `%${genreFilter}%`;
    } else {
        newfilter = `%%`;
    }

    if (orderFilter === "ASC") {
        baseQuery = `SELECT * FROM games WHERE genre ILIKE $1 AND id != 0 AND active = true ORDER BY ${rowFilter} ASC LIMIT 5 OFFSET (5 * ($2 - 1))`
    } else if (orderFilter === "DESC") {
        baseQuery = `SELECT * FROM games WHERE genre ILIKE $1 AND id != 0 AND active = true ORDER BY ${rowFilter} DESC LIMIT 5 OFFSET (5 * ($2 - 1))`
    }

    const result = await client.query(baseQuery, [newfilter, page]);

    res.json(result.rows);
}

const getGameByTittle = async (req, res) => {
    let { tittle } = req.params;
    tittle = `%${tittle}%`;
    const result = await client.query('SELECT * FROM games WHERE tittle ILIKE $1 AND id != 0 AND active = true ORDER BY id LIMIT 5', [tittle]);

    if (result.rows.length > 0) {
        res.json(result.rows);
    } else {
        res.json({ estado: "Titulo no encontrado" })
    }
};

const editGameById = async (req, res) => {
    const { id } = req.params;
    const { tittle, genre, developer, release, user_id, active } = req.body;

    await client.query('UPDATE games SET tittle = $2, genre = $3, developer = $4, release = $5, user_id = $6, active = $7 WHERE id = $1', [id, tittle, genre, developer, release, user_id, active]);
    res.json({ estado: "Juego actualizado correctamente" });
};

const deletGameById = async (req, res) => {
    const { id } = req.params;
    
    await client.query('DELETE FROM games WHERE id = $1', [id]);
    res.json({ estado: "Juego borrado correctamente" });
};

module.exports = { createGame, getGames, getGamesByFilter, getGameById, getGameByTittle, editGameById, deletGameById }