const client = require('../db.js');
const {createLike} = require('./likesController.js')

const createGame = async (req, res) => { 
    try {
        const { tittle, genre, developer, release, user_id } = req.body;

        const gameCheck = await client.query('SELECT * FROM games WHERE tittle = $1', [tittle]);

        if (gameCheck.rows.length === 0) {
            const newGame = await client.query(`INSERT INTO games (active, tittle, genre, developer, release, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`, [false, tittle, genre, developer, release, user_id]);           
            createLike(newGame.rows[0].id, 0)
            res.json({ estado: "Juego creado correctamente"});
        } else {
            res.status(400).json({ error: "Este juego ya existe" }); //Cambiar el codigo.
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getGames = async (req, res) => { 
    try {
        const result = await client.query('SELECT * FROM games WHERE id != 0 ORDER BY id');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}

const getGameById = async (req, res) => { 
    try {
        const { id } = req.params;

        const result = await client.query('SELECT * FROM games WHERE id= $1', [id]);
        
        if(result.rows.length > 0) {
            res.json(result.rows);
        } else {
            res.json({ estado: "Juego no encontrado"})
        }
        
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

const editGameById = async (req, res) => { 
    try {
        const { id } = req.params;

        const { tittle, genre, developer, release, user_id, active } = req.body;
        await client.query('UPDATE games SET tittle = $2, genre = $3, developer = $4, release = $5, user_id = $6, active = $7 WHERE id = $1', [id, tittle, genre, developer, release, user_id, active]);
        res.json({ estado: "Juego actualizado correctamente"});
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

const deletGameById = async (req, res) => { 
    try {
        const { id } = req.params;
        await client.query('DELETE FROM games WHERE id = $1', [id]);
        res.json({ estado: "Juego borrado correctamente"});
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

module.exports = { createGame, getGames, getGameById, editGameById, deletGameById }