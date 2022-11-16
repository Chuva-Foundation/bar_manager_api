const bcrypt = require('bcrypt');
const db = require('../config/database');

class User {
  static async getAll() {
    try {
      const { rows: users } = await db.query('SELECT users.id, username, role_name FROM users JOIN user_roles ON id = user_id JOIN roles on role_id = roles.id;');
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = User;
