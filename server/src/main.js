import express from 'express';
import cookieParser from 'cookie-parser';
import { config } from './config/dotenv.js';
import { clientRoutes } from './routes/clientRoutes.js';
import { authRoutes } from './routes/authRoutes.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser()); 

// Auth Routes
app.use('/auth', authRoutes);

// Client Routes
app.use('/api/v1/client', clientRoutes);



app.listen(config.PORT, () => {
  console.log(`Listen in Port ${config.PORT}`);
  console.log(`\x1b[36m\x1b[4m%s\x1b[0m`,`http://localhost:${config.PORT}/api/v1/client`);
});