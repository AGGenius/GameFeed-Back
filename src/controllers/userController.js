const client = require('../db.js');
const bcryp = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUsers = async (req, res) => {
    const result = await client.query('SELECT * FROM users ORDER BY id');
    let users = result.rows;
    users.forEach(user => delete user.password)

    res.json(users);
}

const getUserByID = async (req, res) => {
    const { id } = req.params;
    const result = await client.query('SELECT * FROM users WHERE id= $1', [id]);

    if (result.rows.length > 0) {
        let user = result.rows[0];
        delete user.password;
        res.json(user);
    } else {
        res.json({ estado: "Usuario no encontrado" })
    }
}

const editUser = async (req, res) => {
    const { id } = req.params;
    const { email, name, nick, type, active } = req.body;

    await client.query('UPDATE users SET email = $2, name = $3, nick = $4, type = $5, active = $6 WHERE id = $1', [id, email, name, nick, type, active]);
    res.json({ estado: "Usuario actualizado correctamente" });
}

const deletUserById = async (req, res) => {
    const { id } = req.params;

    await client.query('DELETE FROM users WHERE id = $1', [id]);
    res.json({ estado: "Usuario borrado correctamente" });
};

const registerUser = async (req, res) => {
    const { email, password, name, nick } = req.body;
    const securePassword = await bcryp.hash(password, 10);

    await client.query(`INSERT INTO users (active, email, password, name, nick, type) VALUES ($1, $2, $3, $4, $5, $6)`, [false, email, securePassword, name, nick, "user"]);
    res.json({ estado: "Usuario creado correctamente" });
}

const loginUser = async (req, res) => {
    const user = res.locals.verifiedUser;

    const token = jwt.sign({ id: user.id, email: user.email, type: user.type, active: user.active }, "secreto", { expiresIn: '1h' });
    res.json({ token, userId: user.id });
}


module.exports = { getUsers, getUserByID, loginUser, editUser, deletUserById, registerUser }