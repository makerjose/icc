import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  authUser,
  registerUser,
  logoutUser,
} from '../controllers/userController.js';

import {
  createVisitor, getVisitor, updateVisitor, deleteVisitor
} from '../controllers/visitorController.js';

const router = express.Router();

// User authentication routes
router.post('/register', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);

// Visitor routes
router.route('/visitors')
  .post(protect, createVisitor) // Create a new visitor
  .get(protect, getVisitor);   // Get all visitors

router.route('/visitors/:id')
  .get(protect, getVisitor)     // Get a visitor by ID
  .put(protect, updateVisitor)  // Update a visitor by ID
  .delete(protect, deleteVisitor); // Delete a visitor by ID

export default router;
