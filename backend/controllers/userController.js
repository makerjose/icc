import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import { pool, hashPassword, matchPassword } from '../config/db.js';


// Auth user & get token
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = rows[0];

  if (user && await matchPassword(password, user.password)) {
    generateToken(res, user.id);

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});


// Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user already exists
  const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  if (existingUser.rows.length > 0) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash the password
  const hashedPassword = await hashPassword(password);

  // Insert the new user
  const newUser = await pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
    [name, email, hashedPassword]
  );

  // Generate token and send response
  const user = newUser.rows[0];
  generateToken(res, user.id);
  res.status(201).json({
    _id: user.id,
    name: user.name,
    email: user.email,
  });
});


// Logout user / clear cookie
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};


export {  authUser, registerUser, logoutUser };
