import { BaseModel } from "./BaseModel.js";

export class ClientModel extends BaseModel {
  constructor() {
    super("clients", ["id", "name", "nit", "phone", "email", "address"]);
  }
}