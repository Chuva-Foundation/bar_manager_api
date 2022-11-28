/* eslint-disable no-multi-str */
const db = require('../configs/database');

class Product {
  static async selectAll() {
    try {
      const { rows: products } = await db.query(
        'SELECT products.id, products.name, categories.name as category, price, products.update_at \
        FROM products JOIN categories ON category_id = categories.id',
      );
      console.log(products);
      return products;
    } catch (error) {
      console.log(error.message);
      return { error: true };
    }
  }

  static async insert(productToInsert) {
    const {
      name, description, category_id, price,
    } = productToInsert;

    try {
      const { rows: products } = await db.query(
        'INSERT INTO products (name, description, category_id, price, create_at, update_at) VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING *;',
        [name, description, category_id, price],
      );

      return products[0];
    } catch (error) {
      console.log(error.message);
      return { error: true, message: error.message };
    }
  }

  static async update(productDataToUpdate) {
    const {
      id, name, description, category_id, price,
    } = productDataToUpdate;

    try {
      if (name) {
        await db.query(
          'UPDATE products SET name = $1, update_at = NOW() WHERE id = $2;',
          [name, id],
        );
      }
      if (description) {
        await db.query(
          'UPDATE products SET description = $1, update_at = NOW() WHERE id = $2;',
          [description, id],
        );
      }
      if (category_id) {
        await db.query(
          'UPDATE products SET category_id = $1, update_at = NOW() WHERE id = $2;',
          [category_id, id],
        );
      }
      if (price) {
        await db.query(
          'UPDATE products SET price = $1, update_at = NOW() WHERE id = $2;',
          [price, id],
        );
      }
      const category = await this.selectById(id);
      return category;
    } catch (error) {
      console.log(error.message);
      return { error: true, message: error.message };
    }
  }

  static async selectById(id) {
    try {
      const { rows: products } = await db.query(
        'SELECT * FROM products JOIN categories ON category_id = categories.id WHERE products.id = $1;',
        [id],
      );
      return products[0];
    } catch (error) {
      console.log(error.message);
      return { error: true };
    }
  }

  static async deleteById(id) {
    try {
      const { rows: products } = await db.query(
        'DELETE FROM products WHERE id = $1 RETURNING name;',
        [id],
      );
      return products[0];
    } catch (error) {
      console.log(error.message);
      return { error: true };
    }
  }
}

module.exports = Product;
