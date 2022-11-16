const bcrypt = require('bcrypt');
const db = require('../config/database');
require('dotenv').config();

const password = process.env.ADMIN_PW;
bcrypt.hash(password, 8, (err, password_hash) => {
  if (err) {
    throw err;
  }
  db.query(
    'INSERT INTO users (name, username, password, role_id, create_at) VALUES ($1 , $2, $3, $4, NOW()) RETURNING id, name, username, role_id;',
    ['administrator', 'admin', password_hash, '1'],
    (error, queryData) => {
      if (error) {
        throw error;
      }
      console.log(queryData.rows);
    },
  );
});
