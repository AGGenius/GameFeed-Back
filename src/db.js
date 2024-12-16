const { Client} = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_UR,
  ssl: true
});

client.connect()
  .then(() => console.log('Conexión exitosa'))
  .catch(err => console.error('Error de conexión', err.stack));

module.exports = client;