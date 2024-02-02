
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user data directly from the database
      const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [decoded.userId]);
      const user = rows[0];

      if (user) {
        // Exclude password field from user object
        delete user.password;

        req.user = user;
        next();
      } else {
        res.status(401);
        throw new Error('Not authorized, user not found');
      }
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protect };

