import database from '../../config/database.js';

export class User {
  static async findByEmail(email) {
    const result = await database.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    return result[0]; // Devuelve el primer usuario encontrado
  }

  static async create({ username, password, email }) {
    const result = await database.query(
      'INSERT INTO usuarios (nick, password, email) VALUES (?, ?, ?)', 
      [username, password, email]
    );
    return {
      id: result.insertId,
      username,
      email,
    };
  }
}