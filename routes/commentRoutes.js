import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js'; // Corrected import
import commentController from '../controllers/commentController.js';

const router = express.Router();

// Add a comment to a remedy
router.post('/comments', authenticate, commentController.addComment);

// Fetch comments for a remedy
router.get('/comments/:remedyId', commentController.getComments);

export default router;
