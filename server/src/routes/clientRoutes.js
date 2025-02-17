import express from 'express';
import { ClientController } from '../controllers/clientController.js';

export const clientRoutes = express.Router();

// Routes
clientRoutes.get('/', ClientController.getAll);
clientRoutes.get('/:id', ClientController.getById);
clientRoutes.post('/', ClientController.create);
clientRoutes.put('/:id', ClientController.update);
clientRoutes.delete('/:id', ClientController.delete);