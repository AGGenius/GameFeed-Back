const client = require('../db.js');

const createGame = async (req, res) => { 
    try {
        const { tittle, genre, developer, release, user_id } = req.body;

        const gameCheck = await client.query('SELECT * FROM games WHERE tittle = $1', [tittle]);

        if (gameCheck.rows.length === 0) {
            await client.query(`INSERT INTO games (tittle, genre, developer, release, user_id) VALUES ($1, $2, $3, $4, $5)`, [tittle, genre, developer, release, user_id]);
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
        const result = await client.query('SELECT * FROM games');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}

const getGameById = async (req, res) => { 
    try {
        const { id } = req.params;
        const result = await client.query('SELECT * FROM games WHERE id= $1', [id]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

const editGameById = async (req, res) => { 
    try {
        const { id } = req.params;

        const { tittle, genre, developer, release, user_id } = req.body;
        await client.query('UPDATE games SET tittle = $2, genre = $3, developer = $4, release = $5, user_id = $6 WHERE id = $1', [id, tittle, genre, developer, release, user_id]);
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