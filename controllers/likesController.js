const client = require('../db.js');

const getLikes = async (req, res) => {
    try {
        const result = await client.query(`SELECT * FROM likes `);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createLike = async (gameId, postId) => { 
    try {
        await client.query(`INSERT INTO likes (game_id, post_id, value) VALUES ($1, $2, $3)`, [ gameId, postId, 0]);

    } catch (error) {
        console.log(error)
    }
}

const controlUserLike = async (req, res) => { 
    try {
        const { user_id, likes_id} = req.body;
        let likeCheck;

        try {
            likeCheck = await client.query('SELECT * FROM userslikes WHERE user_id = $1 AND likes_id = $2', [user_id, likes_id]);
        } catch (error) {
            console.log(error);
        }
        

        if (likeCheck.rows.length === 0) {
            await client.query(`INSERT INTO userslikes (active, user_id, likes_id) VALUES ($1, $2, $3)`, [true, user_id, likes_id]); 
        } else {
            console.log(likeCheck.rows[0].active)
            await client.query('UPDATE userslikes SET active = $3 WHERE user_id = $1 AND likes_id = $2', [user_id, likes_id, !likeCheck.rows[0].active]); //Updatear en un endpoint post?
        }

        
        try {
            const actualLikes = await client.query('SELECT * FROM usersLikes WHERE likes_id = $1 AND active = true', [likes_id])
            await client.query('UPDATE likes SET value = $1 WHERE id = $2', [actualLikes.rows.length, likes_id]); 
        } catch (error) {
            console.log(error);
        }

        try {
            const result = await client.query(`SELECT * FROM likes `);
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {getLikes, createLike, controlUserLike}