import { ClientModel } from "../../models/database/ClientModel.js";

const clientModel = new ClientModel();

export class ClientController {
  static async getAll(req, res){
    const { fields } = req.query;
    const selectedColumns = fields ? fields.split(",") : [];

    const clients = await clientModel.getAll({ selectedColumns });
    res.json(clients);
  }

  static async getById(req, res){
    const { id } = req.params;
    const { fields } = req.query;
    const selectedColumns = fields ? fields.split(",") : [];

    const clients = await clientModel.getById({id,selectedColumns});
    res.json(clients);
  }

  static async create(req, res){
    const { name, nit, phone, email, address } = req.body;

    if (!name || !nit) {
      return res.status(400).json({ message: "Name and NIT are required" });
    }

    const newClient = await clientModel.create({ name, nit, phone, email, address });
    res.json(newClient);
  }
/* 
  static async update(req, res){
    const { id, name, nit, phone, email, address } = req.body;
    const clients = await clientModel.update({ id, name, nit, phone, email, address });
    res.json(clients);
  }

  static async delete(req, res){
    const { id } = req.params;
    const clients = await clientModel.delete({ id });
    res.json(clients);
  } */
}