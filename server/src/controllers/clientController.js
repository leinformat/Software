import { ClientModel } from "../models/clientModel.js";

export class ClientController {
  static async getAll(req, res){
    const clients = await ClientModel.getAll();
    res.json(clients);
  }

  static async getById(req, res){
    const { id } = req.params;
    const clients = await ClientModel.getById({ id });
    res.json(clients);
  }

  static async create(req, res){
    const { name, nit, phone, email, address } = req.body;
    const clients = await ClientModel.create({ name, nit, phone, email, address });
    res.json(clients);
  }

  static async update(req, res){
    const { id, name, nit, phone, email, address } = req.body;
    const clients = await ClientModel.update({ id, name, nit, phone, email, address });
    res.json(clients);
  }

  static async delete(req, res){
    const { id } = req.params;
    const clients = await ClientModel.delete({ id });
    res.json(clients);
  }
}