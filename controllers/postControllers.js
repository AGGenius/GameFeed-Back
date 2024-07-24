const client = require('../db.js');
const {createLike} = require('./likesController.js')

const createPost = async (req, res) => { 
    try {
        const { type, content, user_id, game_id } = req.body;

        const getDate = () => {
            const actualDate = new Date();
            const month = actualDate.getMonth() + 1;
            const year = actualDate.getFullYear();
            const date = actualDate.getDate();
            return `${year}/${month}/${date}`;
        }

        const date = getDate();

        const newPost = await client.query(`INSERT INTO posts (active, type, date, content, user_id, game_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`, [true, type, date, content, user_id, game_id ]);
        createLike(game_id, newPost.rows[0].id)
        res.json({ estado: "Post creado correctamente"});

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getPostsByGameId = async (req, res) => { 
    try {
        const { id } = req.params;

        const result = await client.query('SELECT * FROM posts WHERE game_id= $1 AND id != 0', [id]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}

const editPostById = async (req, res) => { 
    try {
        const { id } = req.params;

        const { type, content, user_id, game_id } = req.body;
        await client.query('UPDATE posts SET type = $2, content = $3, user_id = $4, game_id = $5 WHERE id = $1', [id, type, content, user_id, game_id ]);
        res.json({ estado: "Post actualizado correctamente"});
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

const deletPostById = async (req, res) => { 
    try {
        const { id } = req.params;
        await client.query('DELETE FROM posts WHERE id = $1', [id]);
        res.json({ estado: "Post borrado correctamente"});
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

module.exports = { createPost, getPostsByGameId, editPostById, deletPostById }