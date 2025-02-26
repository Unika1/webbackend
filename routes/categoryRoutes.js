// routes/categoryRoutes.js
import express from 'express';
import categoryController from '../controllers/categoryController.js';

const router = express.Router();

// Get all categories
router.get('/', categoryController.getAllCategories);

// Add a new category
router.post('/', categoryController.addCategory);

// Update a category
router.put('/:id', categoryController.updateCategory);

// Delete a category
router.delete('/:id', categoryController.deleteCategory);

export default router;
