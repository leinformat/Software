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