import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../../models/auth/userModel.js';
import { config } from '../../config/dotenv.js';

export const register = async (req, res) => {
  const { username, password, email } = req.body;

  // Verificar si el usuario ya existe
  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  // Encriptar la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crear el nuevo usuario
  const newUser = await User.create({ username, password: hashedPassword, email });

  // Crear un JWT para el usuario
  const token = jwt.sign({ id: newUser.id, username: newUser.username }, config.JWT_SECRET, {
    expiresIn: '1h',  // Expira en una hora
  });

  res.status(201).json({ message: 'User registered successfully', token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Verificar si el usuario existe
  const user = await User.findByEmail(email);
  if (!user) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  // Verificar la contraseña
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  // Crear un JWT para el usuario
  const token = jwt.sign({ id: user.id, username: user.username }, config.JWT_SECRET, {
    expiresIn: '1h',  // Expira en una hora
  });

  res.status(200).json({ message: 'Login successful', token });
};
