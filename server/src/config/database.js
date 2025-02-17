

import mysql from "mysql2/promise";
import { config } from "./dotenv.js";

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = config;

class Database {
  constructor() {
    this.pool = mysql.createPool({
      host: DB_HOST,
      user: DB_USER,
      port: DB_PORT,
      password: DB_PASSWORD,
      database: DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }

  async query(sql, params = []) {
    try {
      const [rows] = await this.pool.query(sql, params);
      return rows;
    } catch (error) {
      console.error("❌ Ther's an error in the query:", error);
      return error;
    }
  }
}

export default new Database();