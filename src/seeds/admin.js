const db = require('../config/database');
const bcrypt = require('bcrypt');
require('dotenv').config();


  const password = process.env.ADMIN_PW;
  bcrypt.hash(password, 8, (err, password_hash) => {
    if(err){
      throw err;
    }
    db.query(
      'INSERT INTO users (name, username, password, create_at) VALUES ($1 , $2, $3, NOW()) RETURNING id, name, username;',
      ['administrator', 'admin', password_hash],
      (error, queryData) => {
        if (error) {
          throw error;
  
        }
        console.log(queryData.rows);
      }
    );
  });



