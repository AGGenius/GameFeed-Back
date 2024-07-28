const client = require('../db.js');
const bcryp = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUsers = async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM users');      
        let users = result.rows;
        users.forEach(user => delete user.password)

        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await client.query('SELECT * FROM users WHERE id= $1', [id]);

        if(result.rows.length > 0) {
            let user = result.rows[0];
            delete user.password;
            res.json(user);
        } else {
            res.json({ estado: "Usuario no encontrado"})
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const editUser = async (req, res) => {
    try {
        const { id } = req.params;

        const { email, name, nick, type, active } = req.body;

        await client.query('UPDATE users SET email = $2, name = $3, nick = $4, type = $5, active = $6 WHERE id = $1', [id, email, name, nick, type, active ]);
        res.json({ estado: "Usuario actualizado correctamente"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deletUserById = async (req, res) => { 
    try {
        const { id } = req.params;
        await client.query('DELETE FROM users WHERE id = $1', [id]);
        res.json({ estado: "Usuario borrado correctamente"});
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

const registerUser = async (req, res) => {
    try {
        const { email, password, name, nick } = req.body;

        const userCheck = await client.query('SELECT * FROM users WHERE email = $1', [email]);

        if (userCheck.rows.length === 0) {
            const securePassword = await bcryp.hash(password, 10)
            await client.query(`INSERT INTO users (active, email, password, name, nick, type) VALUES ($1, $2, $3, $4, $5, $6)`, [false, email, securePassword, name, nick, "user"]);
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
            return res.status(400).json({ error: 'contraseña incorrecta' }); //Mejor una respuesta ambigua
        }

        const token = jwt.sign({ id: user.id, email: user.email, type: user.type, active: user.active }, "secreto", { expiresIn: '1h' });
        res.json({ token, userId: user.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = { getUsers, getUser, loginUser, editUser, deletUserById, registerUser }