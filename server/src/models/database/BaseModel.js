import database from '../../config/database.js';

export class BaseModel {
    constructor(table,columns) {
      this.table = table;
      this.columns = columns;
    }
    
    handlerColumns(selectedColumns=[]){
      const columns = selectedColumns.filter(value => this.columns.includes(value));
      return  columns.length > 0 ? columns.join(", ") : this.columns.join(", ");
    }

    async getAll({ selectedColumns=[] }) {
      const columns = this.handlerColumns(selectedColumns);
      return await database.query(`SELECT ${columns} FROM ${this.table}`);
    }
  
    async getById({selectedColumns=[], id}) {
      const columns = this.handlerColumns(selectedColumns);
      const result = await database.query(`SELECT ${columns} FROM ${this.table} WHERE id = ?`, [id]);
      return result.length ? result[0] : [];
    }
  
    async create(data) {
      const result = await database.query(`INSERT INTO ${this.table} SET ?`, [data]);
      return { id: result.insertId, ...data };
    }
  
    async update(id, data) {
      const record = await this.getById({ id });

      if (!Object.keys(record).length) {
        return { message: `Record with id ${id} not found` };
      }

      delete data.id;
      await database.query(`UPDATE ${this.table} SET ? WHERE id = ?`, [data, id]);

      return { id, ...data };
    }
  
    async delete(id) {
      await database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
      return { message: `Deleted record with id ${id}` };
    }
  }