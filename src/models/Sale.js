/* eslint-disable no-multi-str */
const db = require('../configs/database');

class Sales {
  static async selectAll() {
    try {
      const { rows: sales } = await db.query(
        'SELECT sales.id, products.name, amount,products.price, users.username, sales.create_at FROM sales \
        JOIN products ON product_id = products.id \
        JOIN users ON seller = users.id;',
      );
      return sales;
    } catch (error) {
      console.log(error.message);
      return { error: true };
    }
  }

  static async selectById(id) {
    try {
      const { rows: sales } = await db.query(
        'SELECT sales.id, products.name, amount,products.price, users.username, sales.create_at FROM sales \
        JOIN products ON product_id = products.id \
        JOIN users ON seller = users.id WHERE sales.id = $1;',
        [id],
      );
      return sales[0];
    } catch (error) {
      console.log(error.message);
      return { error: true };
    }
  }

  static async selectByBill(id) {
    try {
      const { rows: sales } = await db.query(
        'SELECT sales.id, products.name, amount,products.price, users.username, sales.create_at FROM sales \
        JOIN products ON product_id = products.id \
        JOIN users ON seller = users.id \
        JOIN bills ON bill_id = bills.id\
        WHERE bills.id = $1;',
        [id],
      );
      return sales;
    } catch (error) {
      console.log(error.message);
      return { error: true };
    }
  }

  static async insert(product_id, amount, price, seller, bill) {
    try {
      const { rows: sales } = await db.query(
        'INSERT INTO sales (product_id, amount, price, seller, bill_id, create_at, update_at) VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING *;',
        [product_id, amount, price, seller, bill],
      );

      return sales[0];
    } catch (error) {
      console.log(error.message);
      return { error: true, message: error.message };
    }
  }

  static async update(id, seller, dataToUpdate) {
    const {
      product_id, amount,
    } = dataToUpdate;

    try {
      if (product_id) {
        await db.query(
          'UPDATE sales SET product_id = $1, seller = $2, update_at = NOW() WHERE id = $3;',
          [product_id, seller, id],
        );
      }
      if (amount) {
        await db.query(
          'UPDATE sales SET amount = $1, seller = $2, update_at = NOW() WHERE id = $3;',
          [amount, seller, id],
        );
      }
      const sale = await this.selectById(id);
      return sale;
    } catch (error) {
      console.log(error.message);
      return { error: true, message: error.message };
    }
  }
}

module.exports = Sales;
