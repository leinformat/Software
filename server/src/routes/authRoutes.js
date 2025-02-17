import express from 'express';
import { register, login } from '../controllers/auth/authController.js';

export const authRoutes = express.Router();

// Ruta de registro
authRoutes.post('/register', register);

// Ruta de inicio de sesión
authRoutes.post('/login', login);