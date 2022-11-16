/* eslint-disable consistent-return */
// const bcrypt = require('bcrypt');
const db = require('../config/database');

class User {
  static async getAll() {
    try {
      const { rows: users } = await db.query(
        'SELECT users.id, name, username, role_name, create_at FROM users JOIN roles on role_id = roles.id;',
      );
      return users;
    } catch (error) {
      if (error) {
        console.log(error.message);
        return { error: true };
      }
    }
  }

  static async getById(id) {
    try {
      const { rows: users } = await db.query(
        'SELECT users.id, name, username, role_name, create_at FROM users JOIN roles on role_id = roles.id WHERE users.id = $1;',
        [id],
      );
      return users;
    } catch (error) {
      if (error) {
        console.log(error.message);
        return { error: true };
      }
    }
  }
}

module.exports = User;
