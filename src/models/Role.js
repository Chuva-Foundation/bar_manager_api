const db = require('../config/database');

class Role {
  static async selectAll() {
    try {
      const { rows: roles } = await db.query(
        'SELECT id, role_name, description FROM roles;',
      );
      return roles;
    } catch (error) {
      console.log(error.message);
      return { error: true };
    }
  }

  static async selectById(id) {
    try {
      const { rows: roles } = await db.query(
        'SELECT id, role_name, description FROM roles WHERE id = $1;',
        [id],
      );
      return roles[0];
    } catch (error) {
      console.log(error.message);
      return { error: true };
    }
  }

  static async insertRole(roleToInsert) {
    const {
      role_name, description,
    } = roleToInsert;

    try {
      const { rows: roles } = await db.query(
        'INSERT INTO roles (role_name, description) VALUES ($1, $2) RETURNING *;',
        [role_name, description],
      );

      return roles[0];
    } catch (error) {
      console.log(error.message);
      return { error: true, message: error.message };
    }
  }

  static async deleteById(id) {
    try {
      const { rows: roles } = await db.query(
        'DELETE FROM roles WHERE id = $1 RETURNING role_name;',
        [id],
      );
      return roles[0];
    } catch (error) {
      console.log(error.message);
      return { error: true };
    }
  }

  static async updateRole(roleDataToUpdate) {
    const {
      id, role_name, description,
    } = roleDataToUpdate;

    try {
      if (role_name) {
        await db.query(
          'UPDATE roles SET role_name = $1 WHERE id = $2;',
          [role_name, id],
        );
      }
      if (description) {
        await db.query(
          'UPDATE roles SET description = $1 WHERE id = $2;',
          [description, id],
        );
      }
      const role = await this.selectById(id);
      return role;
    } catch (error) {
      console.log(error.message);
      return { error: true, message: error.message };
    }
  }
}

module.exports = Role;
