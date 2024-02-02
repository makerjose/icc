import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();

// Create a connection pool
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

// Test the database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Database connected successfully:', res.rows[0].now);
  }
});

// Function to hash the password using bcrypt
const hashPassword = async (plainPassword) => {
  const saltRounds = 10; // Salt rounds determine the complexity of the hash
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return hashedPassword;
};

// Function to check if the entered password matches the hashed password
const matchPassword = async (enteredPassword, hashedPassword) => {
  const isMatch = await bcrypt.compare(enteredPassword, hashedPassword);
  return isMatch;
};

export { pool, hashPassword, matchPassword };
