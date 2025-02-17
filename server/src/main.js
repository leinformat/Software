import express from 'express';
import { config } from './config/dotenv.js';
import { clientRoutes } from './routes/clientRoutes.js';
import { authRoutes } from './routes/authRoutes.js';

const app = express();

// Middlewares
app.use(express.json());

// Client Routes
app.use('/api/v1/client', clientRoutes);

app.use('/auth', authRoutes);

app.listen(config.PORT, () => {
  console.log(`Listen in Port ${config.PORT}`);
  console.log(`\x1b[36m\x1b[4m%s\x1b[0m`,`http://localhost:${config.PORT}/api/v1/client`);
});