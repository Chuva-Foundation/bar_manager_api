const db = require('../config/database');

class Card {
  static async selectAll() {
    try {
      const { rows: cards } = await db.query(
        'SELECT * FROM cards;',
      );
      return cards;
    } catch (error) {
      console.log(error.message);
      return { error: true };
    }
  }

  static async selectById(id) {
    try {
      const { rows: cards } = await db.query(
        'SELECT * FROM cards WHERE id = $1;',
        [id],
      );
      return cards[0];
    } catch (error) {
      console.log(error.message);
      return { error: true };
    }
  }

  static async insert(cardIdToInsert) {
    try {
      const { rows: cards } = await db.query(
        'INSERT INTO cards (id, create_at, update_at) VALUES ($1, NOW(), NOW()) RETURNING *;',
        [cardIdToInsert],
      );

      return cards[0];
    } catch (error) {
      console.log(error.message);
      return { error: true, message: error.message };
    }
  }

  static async update(cardDataToUpdate) {
    const {
      id, active,
    } = cardDataToUpdate;

    try {
      if (active !== undefined) {
        await db.query(
          'UPDATE cards SET active = $1, update_at = NOW() WHERE id = $2;',
          [active, id],
        );
      }

      const card = await this.selectById(id);
      return card;
    } catch (error) {
      console.log(error.message);
      return { error: true, message: error.message };
    }
  }
}

module.exports = Card;
