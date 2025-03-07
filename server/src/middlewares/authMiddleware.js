import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

export const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];  // Expecting "Bearer token"
  
  if (!token) {
    return res.status(403).json({ error: 'Access denied, token missing!' });
  }

  jwt.verify(token, config.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token!' });
    }

    req.user = user;  // Attach the user to the request object
    next();  // Continue with the next middleware/route handler
  });
};

export const verifyToken = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ error: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded; // Guarda la info del usuario en `req.user`
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
};
