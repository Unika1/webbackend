import express from "express";
import { addReview, getReviews, deleteReview , updateReview} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", addReview);  // ✅ POST route for submitting reviews
router.get("/:remedyId", getReviews);  // ✅ GET route to fetch reviews
router.delete("/:id", deleteReview);  
router.put("/:id", updateReview);
export default router;