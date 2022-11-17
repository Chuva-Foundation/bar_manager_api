/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const db = require('../config/database');

class User {
  static async selectAll() {
    try {
      const { rows: users } = await db.query(
        'SELECT users.id, name, username, role_id, role_name, create_at, update_at FROM users JOIN roles on role_id = roles.id;',
      );
      return users;
    } catch (error) {
      console.log(error.message);
      return { error: true };
    }
  }

  static async insertUser(userToInsert) {
    const {
      name, username, password, role,
    } = userToInsert;

    try {
      // const isUsernameNotAvilable = await this.selectByUsername(username);
      // if (isUsernameNotAvilable) return { error: true, message: 'username not available' };

      const password_hash = await bcrypt.hash(password, 10);

      const { rows: users } = await db.query(
        'INSERT INTO users (name, username, password, role_id, create_at, update_at) VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING username;',
        [name, username, password_hash, role],
      );

      return users[0];
    } catch (error) {
      console.log(error.message);
      return { error: true, message: error.message };
    }
  }

  static async updateUser(userDataToUpdate) {
    const {
      id, name, password, role,
    } = userDataToUpdate;

    try {
      // const isUsernameNotAvilable = await this.selectByUsername(username);
      // if (isUsernameNotAvilable) return { error: true, message: 'username not available' };
      if (name) {
        await db.query(
          'UPDATE users SET name = $1, update_at = NOW()  WHERE id = $2;',
          [name, id],
        );
      }
      if (password) {
        const password_hash = await bcrypt.hash(password, 10);
        await db.query(
          'UPDATE users SET password = $1, update_at = NOW() WHERE id = $2;',
          [password_hash, id],
        );
      }
      if (role) {
        await db.query(
          'UPDATE users SET role_id = $1, update_at = NOW() WHERE id = $2;',
          [role, id],
        );
      }
      const user = await this.selectById(id);
      return user;
    } catch (error) {
      console.log(error.message);
      return { error: true, message: error.message };
    }
  }

  static async selectById(id) {
    try {
      const { rows: users } = await db.query(
        'SELECT users.id, name, username, role_id, role_name, create_at FROM users JOIN roles on role_id = roles.id WHERE users.id = $1;',
        [id],
      );
      return users[0];
    } catch (error) {
      console.log(error.message);
      return { error: true };
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
      console.log(error.message);
      return { error: true };
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
      console.log(error.message);
      return { error: true };
    }
  }

  static async correctPassword(id, password) {
    try {
      const queryData = await db.query(
        'SELECT password FROM users WHERE id = $1',
        [id],
      );
      if (!queryData.rowCount) return false;
      const password_hash = queryData.rows[0].password;
      return await bcrypt.compare(password, password_hash);
    } catch (error) {
      console.log(error.message);
      return { error: true };
    }
  }
}

module.exports = User;
