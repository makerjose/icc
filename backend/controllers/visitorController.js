import asyncHandler from 'express-async-handler';
import { pool } from '../config/db.js'; // Import the database connection

// Create a new visitor
const createVisitor = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phoneNo } = req.body;

  const newVisitor = await pool.query(
    'INSERT INTO visitors (firstName, lastName, email, phoneNo) VALUES ($1, $2, $3, $4) RETURNING *',
    [firstName, lastName, email, phoneNo]
  );

  res.status(201).json(newVisitor.rows[0]);
});

// Get a visitor by ID
const getVisitor = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { rows } = await pool.query('SELECT * FROM visitors WHERE id = $1', [id]);

  if (rows.length > 0) {
    res.json(rows[0]);
  } else {
    res.status(404);
    throw new Error('Visitor not found');
  }
});

// Update a visitor by ID
const updateVisitor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phoneNo } = req.body;

  const updatedVisitor = await pool.query(
    'UPDATE visitors SET firstName = $1, lastName = $2, email = $3, phoneNo = $4 WHERE id = $5 RETURNING *',
    [firstName, lastName, email, phoneNo, id]
  );

  if (updatedVisitor.rows.length > 0) {
    res.json(updatedVisitor.rows[0]);
  } else {
    res.status(404);
    throw new Error('Visitor not found');
  }
});

// Delete a visitor by ID
const deleteVisitor = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedVisitor = await pool.query('DELETE FROM visitors WHERE id = $1 RETURNING *', [id]);

  if (deletedVisitor.rows.length > 0) {
    res.json({ message: 'Visitor deleted successfully' });
  } else {
    res.status(404);
    throw new Error('Visitor not found');
  }
});

export { createVisitor, getVisitor, updateVisitor, deleteVisitor };
