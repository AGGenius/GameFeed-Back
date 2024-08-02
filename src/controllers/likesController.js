const client = require('../db.js');

const getLikes = async (req, res) => {
    const result = await client.query(`SELECT * FROM likes `);
    res.json(result.rows);
}

const createLike = async (gameId, postId) => {
    try {
        await client.query(`INSERT INTO likes (game_id, post_id, value) VALUES ($1, $2, $3)`, [gameId, postId, 0]);
    } catch (error) {
        console.log(error)
    }
}

const controlUserLike = async (req, res) => {
    const { user_id, likes_id } = req.body;

    const likeCheck = await client.query('SELECT * FROM userslikes WHERE user_id = $1 AND likes_id = $2', [user_id, likes_id]);


    if (likeCheck.rows.length === 0) {
        await client.query(`INSERT INTO userslikes (active, user_id, likes_id) VALUES ($1, $2, $3)`, [true, user_id, likes_id]);
    } else {
        await client.query('UPDATE userslikes SET active = $3 WHERE user_id = $1 AND likes_id = $2', [user_id, likes_id, !likeCheck.rows[0].active]); //Updatear en un endpoint post?
    }

    const actualLikes = await client.query('SELECT * FROM usersLikes WHERE likes_id = $1 AND active = true', [likes_id])
    await client.query('UPDATE likes SET value = $1 WHERE id = $2', [actualLikes.rows.length, likes_id]);

    const result = await client.query(`SELECT * FROM likes `);
    res.json(result.rows);
}


module.exports = { getLikes, createLike, controlUserLike }