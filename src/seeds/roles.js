const db = require('../config/database');


  db.query(
    'INSERT INTO roles (role_name) VALUES ($1), ($2), ($3), ($4) RETURNING *',
    ['admin', 'doorman', 'waiter', 'cashier'],
    (error, queryData) => {
      if (error){
        throw error;

      }
      console.log(queryData.rows);
    }
  );


