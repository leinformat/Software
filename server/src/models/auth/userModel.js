import database from '../../config/database.js';

export class User {
  static async findByUsername(username) {
    const result = await database.query('SELECT * FROM users WHERE username = ?', [username]);
    return result[0]; // Devuelve el primer usuario encontrado
  }

  static async create({ username, password, email }) {
    const result = await database.query(
      'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
      [username, password, email]
    );
    return {
      id: result.insertId,
      username,
      email,
    };
  }
}