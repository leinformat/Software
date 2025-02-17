import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Required environment variables
const requiredEnvVars = ['DB_PORT', 'DB_NAME', 'DB_USER', 'DB_HOST'];

// Check for missing variables
const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
  console.error(`❌ Missing the following environment variables: ${missingVars.join(', ')}`);
  process.exit(1); // Stop execution if essential variables are missing
}

// Exporting environment variables
export const config = {
  PORT: process.env.PORT || 3000,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_HOST: process.env.DB_HOST,
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  JWT_SECRET: process.env.JWT_SECRET || ""
};