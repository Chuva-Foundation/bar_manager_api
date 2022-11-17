const db = require('../config/database');

class Product {
  static async selectAll() {
    try {
      const { rows: products } = await db.query(
        'SELECT * FROM products;',
      );
      return products;
    } catch (error) {
      console.log(error.message);
      return { error: true };
    }
  }

  static async insert(productToInsert) {

  }

  static async update(productDataToUpdate) {

  }

  static async selectById(id) {
    try {
      const { rows: products } = await db.query(
        'SELECT * FROM products WHERE id = $1;',
        [id],
      );
      return products[0];
    } catch (error) {
      console.log(error.message);
      return { error: true };
    }
  }

  static async deleteById(id) {

  }
}

module.exports = Product;
