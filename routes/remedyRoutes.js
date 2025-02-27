import { Router } from 'express';
import { 
  getAllRemedies,
  getRemedyById, 
  addRemedy, 
  getRemediesByCategory, 
  deleteRemedy, 
  updateRemedy 
} from '../controllers/remedyController.js';

import { authenticate, isAdmin } from '../middleware/authMiddleware.js';
import multer, { diskStorage } from 'multer';

const router = Router();

// Set up multer storage for image uploads
const storage = diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'), // Upload to 'uploads/' folder
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname), // Unique filename
});

const multerUpload = multer({ storage });

// Debugging log to confirm route is hit
router.use((req, res, next) => {
  console.log(`🔵 Request received: ${req.method} ${req.originalUrl}`);
  next();
});

// Public routes (No authentication required)
router.get('/', getAllRemedies); // Get all remedies
router.get('/category/:categoryId', getRemediesByCategory); // Get remedies by category
router.get("/:id", getRemedyById);
// ✅ Admin-protected routes
router.post("/", authenticate, isAdmin, multerUpload.single("image"), addRemedy); // Add a new remedy
router.put("/:id", multerUpload.single("image"), updateRemedy); // Update a remedy
router.delete("/:id", authenticate, isAdmin, deleteRemedy); // Delete a remedy

export default router;
