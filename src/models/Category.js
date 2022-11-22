const db = require('../configs/database');

class Category {
  static async selectAll() {
    try {
      const { rows: categories } = await db.query(
        'SELECT * FROM categories;',
      );
      return categories;
    } catch (error) {
      console.log(error.message);
      return { error: true };
    }
  }

  static async selectById(id) {
    try {
      const { rows: categories } = await db.query(
        'SELECT * FROM categories WHERE id = $1;',
        [id],
      );
      return categories[0];
    } catch (error) {
      console.log(error.message);
      return { error: true };
    }
  }

  static async insert(categoryToInsert) {
    const {
      name, description,
    } = categoryToInsert;

    try {
      const { rows: categories } = await db.query(
        'INSERT INTO categories (name, description, create_at, update_at) VALUES ($1, $2, NOW(), NOW()) RETURNING *;',
        [name, description],
      );

      return categories[0];
    } catch (error) {
      console.log(error.message);
      return { error: true, message: error.message };
    }
  }

  static async deleteById(id) {
    try {
      const { rows: categories } = await db.query(
        'DELETE FROM categories WHERE id = $1 RETURNING name;',
        [id],
      );
      return categories[0];
    } catch (error) {
      console.log(error.message);
      return { error: true };
    }
  }

  static async update(categoryDataToUpdate) {
    const {
      id, name, description,
    } = categoryDataToUpdate;

    try {
      if (name) {
        await db.query(
          'UPDATE categories SET name = $1, update_at = NOW() WHERE id = $2;',
          [name, id],
        );
      }
      if (description) {
        await db.query(
          'UPDATE categories SET description = $1, update_at = NOW() WHERE id = $2;',
          [description, id],
        );
      }
      const category = await this.selectById(id);
      return category;
    } catch (error) {
      console.log(error.message);
      return { error: true, message: error.message };
    }
  }
}

module.exports = Category;
