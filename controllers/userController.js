const client = require('../db.js');
const bcryp = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await client.query('SELECT * FROM users WHERE id= $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        let user = result.rows[0];
        delete user.password;

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const registerUser = async (req, res) => {
    try {
        const { email, password, name, nick } = req.body;

        const userCheck = await client.query('SELECT * FROM users WHERE email = $1', [email]);

        if (userCheck.rows.length === 0) {
            const securePassword = await bcryp.hash(password, 10)
            await client.query(`INSERT INTO users (email, password, name, nick, type, state) VALUES ($1, $2, $3, $4, $5, $6)`, [email, securePassword, name, nick, "user", "inactive"]);
            res.json({ estado: "Usuario creado correctamente"});
        } else {
            res.status(400).json({ error: "Email ya en uso" }); //Cambiar el codigo.
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'Credenciales incorrectas' });
        }

        const user = result.rows[0];

        const verifiedUser = await bcryp.compare(password, user.password);

        if (!verifiedUser) {
            return res.status(400).json({ error: 'contraseña incorrecta' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, "secreto", { expiresIn: '1h' });
        res.json({ token, userId: user.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = { getUser, loginUser, registerUser }