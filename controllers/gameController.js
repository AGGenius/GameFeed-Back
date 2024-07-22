const client = require('../db.js');

exports.getGames = async (req, res) => { 
    try {
        const result = await client.query('SELECT * FROM games');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}