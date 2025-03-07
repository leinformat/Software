import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../../models/auth/userModel.js';
import { config } from '../../config/dotenv.js';

export const register = async (req, res) => {
  const { username, password, email } = req.body;

  // Verify if the user exists
  const existingUser = await User.findByUsername(username);
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  // Encript the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crea
  const newUser = await User.create({ username, password: hashedPassword, email });

  // Crear un JWT para el usuario
  const token = jwt.sign({ id: newUser.id, username: newUser.username }, config.JWT_SECRET, {
    expiresIn: '1h',  // Expira en una hora
  });

  res.status(201).json({ message: 'User registered successfully', token });
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  // Verify if the user exists
  const user = await User.findByUsername(username);

  if (!user) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  // Verify the password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  // Create a JWT for the user
  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, config.JWT_SECRET, {
    expiresIn: '1h',  // 1 hour
  });

  res.cookie('accessToken', token, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60, // 1 hour
  });

  // Return the user data and the JWT token
  const userData = { id: user.id, username: user.username, role: user.role }
  res.status(200).json({ message: "Login successful", token, userData });
};