const client = require('../db.js');
const { createLike } = require('./likesController.js')

const getPostsByGameId = async (req, res) => {
    const { id } = req.params;

    const result = await client.query('SELECT posts.id, posts.active, posts.post_type, posts.content, posts.date, posts.user_id, users.nick FROM posts JOIN users ON (posts.user_id = users.id) WHERE game_id= $1 AND posts.id != 0 AND posts.active = true ORDER BY id', [id]);
    res.json(result.rows);
}

const getPostByFilter = async (req, res) => {
    const { id, page, typeFilter, rowFilter, orderFilter } = req.query;
    let newfilter;
    let baseQuery;

    if (typeFilter) {
        newfilter = `%${typeFilter}%`;
    } else {
        newfilter = `%%`;
    }

    if (orderFilter === "ASC") {
        baseQuery = `SELECT posts.id, posts.active, posts.post_type, posts.content, posts.date, posts.user_id, users.nick 
            FROM posts JOIN users ON (posts.user_id = users.id) 
            WHERE post_type ILIKE $1 AND game_id= $2 AND posts.id != 0 AND posts.active = true 
            ORDER BY ${rowFilter} ASC LIMIT 5 OFFSET (5 * ($3 - 1))`;
    } else if (orderFilter === "DESC") {
        baseQuery = `SELECT posts.id, posts.active, posts.post_type, posts.content, posts.date, posts.user_id, users.nick 
            FROM posts JOIN users ON (posts.user_id = users.id) 
            WHERE post_type ILIKE $1 AND game_id= $2 AND posts.id != 0 AND posts.active = true 
            ORDER BY ${rowFilter} DESC LIMIT 5 OFFSET (5 * ($3 - 1))`;
    }

    const result = await client.query(baseQuery, [newfilter, id, page]);
    res.json(result.rows);
}

const getPostsById = async (req, res) => {
    const { id } = req.params;

    const result = await client.query('SELECT * FROM posts WHERE id= $1 AND id != 0', [id]);

    if (result.rows.length > 0) {
        res.json(result.rows);
    } else {
        res.json({ estado: "Post no encontrado" })
    }
}

const editPostById = async (req, res) => {
    const { id } = req.params;
    const { post_type, content, user_id, game_id, active } = req.body;

    await client.query('UPDATE posts SET post_type = $2, content = $3, user_id = $4, game_id = $5, active = $6 WHERE id = $1', [id, post_type, content, user_id, game_id, active]);
    res.json({ estado: "Post actualizado correctamente" });
};

const deletPostById = async (req, res) => {
    const { id } = req.params;

    await client.query('DELETE FROM posts WHERE id = $1', [id]);
    res.json({ estado: "Post borrado correctamente" });
};

const createPost = async (req, res) => {
    const { post_type, content, user_id, game_id } = req.body;

    const getDate = () => {
        const actualDate = new Date();
        const month = actualDate.getMonth() + 1;
        const year = actualDate.getFullYear();
        const date = actualDate.getDate();
        return `${year}/${month}/${date}`;
    }

    const date = getDate();

    const newPost = await client.query(`INSERT INTO posts (active, post_type, date, content, user_id, game_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`, [true, post_type, date, content, user_id, game_id]);
    createLike(game_id, newPost.rows[0].id)
    res.json({ estado: "Post creado correctamente" });
}

module.exports = { createPost, getPostsByGameId, getPostByFilter, getPostsById, editPostById, deletPostById }