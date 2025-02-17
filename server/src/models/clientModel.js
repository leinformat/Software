import database from '../config/database.js';

export class ClientModel {
  static async getAll() {
    const result = await database.query('SELECT * FROM clients');
    return result;
  }

  static async getById({ id }) {
    const result = await database.query('SELECT * FROM clients WHERE ID = ?', [id]);

    if (!result.length) {
      return { message: `Record with ID ${id} not found` };
    }

    return result[0];
  }

  static async create({ name, nit, phone, email, address }) {
    const sql = `INSERT INTO clients (name, nit, phone, email, address) VALUES (?, ?, ?, ?, ?)`;
    const result = await database.query(sql, [name, nit, phone, email, address]);

    if (result.affectedRows === 1) {
      return {
        id: result.insertId,
        name,
        nit,
        phone,
        email,
        address
      };
    }

    return result;
  }

  static async update({ id, name, nit, phone, email, address }) {
    const sql = `UPDATE clients SET name = ?, nit = ?, phone = ?, email = ?, address = ? WHERE ID = ?`;
    return database.query(sql, [name, nit, phone, email, address,id]);
  }

  static async delete({ id }) {
    const client = await this.getById({ id });
  
    if (!client.id) {
      return client;
    }

    const sql = `DELETE FROM clients WHERE ID = ?`;
    const result = await database.query(sql, [id]);

    if (result.affectedRows === 1) {
      return {
        id: result.insertId,
        ...client
      };
    }

    return result;
  }
}