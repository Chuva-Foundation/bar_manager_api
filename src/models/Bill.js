const db = require('../config/database');

class Bills {
  static async selectAll() {
    try {
      const { rows: bills } = await db.query(
        'SELECT * FROM bills;',
      );
      return bills;
    } catch (error) {
      console.log(error.message);
      return { error: true };
    }
  }

  static async selectById(id) {
    try {
      const { rows: bills } = await db.query(
        'SELECT * FROM bills WHERE id = $1;',
        [id],
      );
      return bills[0];
    } catch (error) {
      console.log(error.message);
      return { error: true };
    }
  }

  static async selectByCardId(card_id) {
    try {
      const { rows: bills } = await db.query(
        'SELECT * FROM bills WHERE card_id = $1;',
        [card_id],
      );
      return bills[0];
    } catch (error) {
      console.log(error.message);
      return { error: true };
    }
  }

  static async insert(billDataToInsert) {
    const {
      card_id,
    } = billDataToInsert;
    try {
      const { rows: bills } = await db.query(
        'INSERT INTO bills (card_id, create_at, update_at) VALUES ($1, NOW(), NOW()) RETURNING *;',
        [card_id],
      );

      return bills[0];
    } catch (error) {
      console.log(error.message);
      return { error: true, message: error.message };
    }
  }

  static async update(cardDataToUpdate) {
    const {
      card_id,
    } = cardDataToUpdate;

    try {
      const { rows: bills } = await db.query(
        'UPDATE bills SET paid_out = true, card_id =null, update_at = NOW() WHERE card_id = $1 RETURNING *;',
        [card_id],
      );
      return bills[0];
    } catch (error) {
      console.log(error.message);
      return { error: true, message: error.message };
    }
  }
}

module.exports = Bills;
