const pool = require('../utils/pool');


module.exports = class Email {
  id;
  message;

  constructor(row) {
    this.id = row.id;
    this.message = row.message;
  }

  static async insert({ message }) {
    const { rows } = await pool.query(`
    INSERT INTO emails (message) VALUES ($1) RETURNING *`,
    [ message ]
    );
    return new Email(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM emails');
    
    return rows.map(row => new Email(row));
  }

  static async getEmailById(id) {
    const { rows } = await pool.query(`
    SELECT * 
    FROM emails
    WHERE id=$1`, [id]);

    return new Email(rows[0])
  }

  static async updateEmail({ id, message }) {
    const { rows } = await pool.query(`
    UPDATE emails
    SET message=$1
    WHERE id=$2
    RETURNING *`, [message, id]);

    return new Email(rows[0])
  }

  static async deleteEmail(id) {
    const { rows } = await pool.query(`
    DELETE
    FROM emails
    WHERE id=$1`, [id]);

    return new Email(rows[0]);
  }
};