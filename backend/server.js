import path from 'path';
import express from 'express';
// import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import { pool } from './config/db.js'; // Import the database connection

dotenv.config();

const app = express();

// // Allow all requests from localhost:3000
// app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api', userRoutes);

const port = process.env.PORT || 5432;

// Define a function to start the server after the database connection is established
const startServer = async () => {
  try {
    // Wait for the database connection test to complete
    const result = await pool.query('SELECT NOW()');
    console.log('Database connected successfully-server:', result.rows[0].now);

    // Start the server
    app.listen(port, () => console.log(`Server listening on port ${port}`));
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
    process.exit(1); // Exit the process if database connection fails
  }
};

// Call the function to start the server
startServer();

app.get('/', (req, res) => {
  res.send('API is running....');
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
}

app.use(notFound);
app.use(errorHandler);
