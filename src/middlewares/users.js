const client = require('../db.js');
const bcryp = require('bcrypt');

const validLoginData = async (req, res, next) => {
    const { email, password } = req.body;
    
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
        return res.status(401).json({ estado: 'Credenciales incorrectas' });
    }

    const user = result.rows[0];

    if (!user.active) {
        return res.status(401).json({ estado: 'Usuario inactivo' });
    };

    const verifiedUser = await bcryp.compare(password, user.password);

    if (!verifiedUser) {
        return res.status(401).json({ estado: 'Credenciales incorrectas' });
    };

    res.locals.verifiedUser = user;
	next();
}


module.exports = { validLoginData, }
