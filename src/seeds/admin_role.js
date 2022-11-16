const db = require('../config/database');

db.query(
  'INSERT INTO user_roles (user_id, role_id) VALUES ($1 , $2) RETURNING user_id, role_id;',
  [3, 1],
  (error, queryData) => {
    if (error) {
      throw error;
    }
    console.log(queryData.rows);
  },
);
