import { Review } from "../model/Review.js";  // Import your Review model

// ✅ Add a new review
export const addReview = async (req, res) => {
  try {
    console.log("🔵 Received Review:", req.body);
    
    const { remedyId, userId, username, comment } = req.body;

    if (!remedyId || !userId || !username || !comment) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const review = await Review.create({ remedyId, userId, username, comment });

    // ✅ Send the expected response format
    res.status(201).json({ success: true, review });

  } catch (error) {
    console.error("❌ Error adding review:", error);
    res.status(500).json({ error: "Failed to add review" });
  }
};



// ✅ Get reviews for a remedy
export const getReviews = async (req, res) => {
  try {
    const { remedyId } = req.params;
    const reviews = await Review.findAll({ where: { remedyId } });
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;  // ✅ Extract userId from query params

    console.log("🔵 Received delete request - Review ID:", id, "User ID:", userId);

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const review = await Review.findByPk(id);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    console.log("🟢 Stored userId in DB:", review.userId, "🟡 Received userId:", userId);

    if (String(review.userId) !== String(userId)) {  // Convert to string for safe comparison
      return res.status(403).json({ error: "Unauthorized to delete this review" });
    }

    await review.destroy();
    res.json({ success: true, message: "Review deleted successfully" });

  } catch (error) {
    console.error("❌ Error deleting review:", error);
    res.status(500).json({ error: "Failed to delete review" });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { userId, comment } = req.body;
    const { id } = req.params;

    console.log(`🔵 Received Edit Request - Review ID: ${id}, User ID: ${userId}`);

    // ✅ Find the review
    const review = await Review.findByPk(id);

    if (!review) {
      return res.status(404).json({ success: false, error: "Review not found" });
    }

    // ✅ Ensure only the author can edit
    if (review.userId !== Number(userId)) {
      return res.status(403).json({ success: false, error: "Unauthorized to edit this review" });
    }

    // ✅ Update the review
    review.comment = comment;
    await review.save();

    res.json({ success: true, message: "Review updated successfully", review });

  } catch (error) {
    console.error("❌ Error updating review:", error);
    res.status(500).json({ success: false, error: "Failed to update review" });
  }
};
