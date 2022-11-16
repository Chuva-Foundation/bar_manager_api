/* eslint-disable consistent-return */
// const bcrypt = require('bcrypt');
const db = require('../config/database');

class User {
  static async selectAll() {
    try {
      const { rows: users } = await db.query(
        'SELECT users.id, name, username, role_id, role_name, create_at FROM users JOIN roles on role_id = roles.id;',
      );
      return users;
    } catch (error) {
      if (error) {
        console.log(error.message);
        return { error: true };
      }
    }
  }

  static async insertUser(userToInsert) {
    const {
      name, username, password, role,
    } = userToInsert;

    try {
      // const isUsernameNotAvilable = await this.selectByUsername(username);
      // if (isUsernameNotAvilable) return { error: true, message: 'username not available' };

      const { rows: users } = await db.query(
        'INSERT INTO users (name, username, password, role_id, create_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING username;',
        [name, username, password, role],
      );

      return users[0];
    } catch (error) {
      if (error) {
        console.log(error.message);
        return { error: true, message: error.message };
      }
    }
  }

  static async selectById(id) {
    try {
      const { rows: users } = await db.query(
        'SELECT users.id, name, username, role_id, role_name, create_at FROM users JOIN roles on role_id = roles.id WHERE users.id = $1;',
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

  static async selectByUsername(username) {
    try {
      const { rows: users } = await db.query(
        'SELECT users.id, name, username, role_id, role_name, create_at FROM users JOIN roles on role_id = roles.id WHERE username = $1',
        [username],
      );
      return users[0];
    } catch (error) {
      if (error) {
        return error;
      }
    }
  }

  static async deleteById(id) {
    try {
      const { rows: users } = await db.query(
        'DELETE FROM users WHERE id = $1 RETURNING username;',
        [id],
      );
      return users[0];
    } catch (error) {
      if (error) {
        console.log(error.message);
        return { error: true };
      }
    }
  }
}

module.exports = User;
