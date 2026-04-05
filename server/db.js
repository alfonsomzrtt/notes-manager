import pkg from 'pg'; 
import dotenv from 'dotenv';

//This loads the variables from .env file into process.env
dotenv.config();

// Simple check: if DB_USER is missing, 
//something is wrong with the .env path

if (!process.env.DB_USER) {
  console.error("ERROR: .env file not found or DB_USER not defined!");
}


const { Pool }  = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
});

export default pool;