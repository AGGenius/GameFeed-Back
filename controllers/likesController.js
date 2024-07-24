const client = require('../db.js');

const createLike = async (gameId, postId) => { 
    try {
        await client.query(`INSERT INTO likes (game_id, post_id, value) VALUES ($1, $2, $3)`, [ gameId, postId, 0]);

    } catch (error) {
        console.log(error)
    }
}

const createUserLike = async (req, res) => { 
    try {
        const { user_id, likes_id} = req.body;

        const likeCheck = await client.query('SELECT * FROM userslikes WHERE user_id = $1 AND likes_id = $2', [user_id, likes_id]);

        if (likeCheck.rows.length === 0) {
            await client.query(`INSERT INTO userslikes (active, user_id, likes_id) VALUES ($1, $2, $3)`, [true, user_id, likes_id]);
            res.json({ estado: "Like incrementado"});
        } else {
            await client.query('UPDATE userslikes SET active = $3 WHERE user_id = $1 AND likes_id = $2', [user_id, likes_id, !likeCheck.rows[0].active]); //Updatear en un endpoint post?
            res.json({ estado: `Like cambiado ${likeCheck.rows[0].active}`});
        }

        setLikesById(likes_id);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const setLikesById = async (likes_id) => {
    try {
        const actualLikes = await client.query('SELECT * FROM usersLikes WHERE likes_id = $1 AND active = true', [likes_id])
        await client.query('UPDATE likes SET value = $2 WHERE id = $1', [likes_id, actualLikes.rows.length]); //Updatear en un endpoint post?
    } catch (error) {
        console.log(error);
    }
}


module.exports = { createLike, createUserLike}