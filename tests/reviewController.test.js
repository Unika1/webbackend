import { addReview, getReviews, deleteReview, updateReview } from '../controllers/ReviewController.js';
import { create as _create, findAll as _findAll, findByPk as _findByPk, destroy as _destroy } from '../model/Review.js';

// Mock Sequelize Methods
jest.mock('../model/Review.js', () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  destroy: jest.fn(),
}));

describe('Review Controller', () => {
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  it('should add a new review', async () => {
    const req = { body: { remedyId: 1, userId: 1, username: 'Test User', comment: 'Great remedy!' } };
    const res = mockResponse();
    _create.mockResolvedValue(req.body); // Mock the create method to return the request body

    await addReview(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true, review: req.body }));
  });

  it('should return 400 if required fields are missing', async () => {
    const req = { body: { remedyId: 1, userId: 1 } }; // Missing username and comment
    const res = mockResponse();

    await addReview(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "All fields are required" });
  });

  it('should get reviews for a remedy', async () => {
    const req = { params: { remedyId: 1 } };
    const res = mockResponse();
    _findAll.mockResolvedValue([{ id: 1, comment: 'Great remedy!' }]); // Mock the findAll method

    await getReviews(req, res);

    expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([{ id: 1, comment: 'Great remedy!' }]));
  });

  it('should return 500 if an error occurs while fetching reviews', async () => {
    const req = { params: { remedyId: 1 } };
    const res = mockResponse();
    _findAll.mockRejectedValue(new Error('Database error')); // Simulate an error

    await getReviews(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Failed to fetch reviews" });
  });

  it('should delete a review', async () => {
    const req = { params: { id: 1 }, query: { userId: 1 } };
    const res = mockResponse();
    _findByPk.mockResolvedValue({ id: 1, userId: 1, destroy: jest.fn() }); // Mock the findByPk method

    await deleteReview(req, res);

    expect(res.json).toHaveBeenCalledWith({ success: true, message: "Review deleted successfully" });
  });

  it('should return 404 if review not found on delete', async () => {
    const req = { params: { id: 2 }, query: { userId: 1 } };
    const res = mockResponse();
    _findByPk.mockResolvedValue(null); // Mock the findByPk method to return null

    await deleteReview(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Review not found" });
  });

  it('should return 403 if user is unauthorized to delete the review', async () => {
    const req = { params: { id: 1 }, query: { userId: 2 } };
    const res = mockResponse();
    _findByPk.mockResolvedValue({ id: 1, userId: 1 }); // Mock the findByPk method

    await deleteReview(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized to delete this review" });
  });

  it('should update a review', async () => {
    const req = { params: { id: 1 }, body: { userId: 1, comment: 'Updated comment' } };
    const res = mockResponse();
    _findByPk.mockResolvedValue({ id: 1, userId: 1, comment: 'Old comment', save: jest.fn() }); // Mock the findByPk method

    await updateReview(req, res);

    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true, message: "Review updated successfully" }));
  });

  it('should return 404 if review not found on update', async () => {
    const req = { params: { id: 2 }, body: { userId: 1, comment: 'Updated comment' } };
    const res = mockResponse();
    _findByPk.mockResolvedValue(null); // Mock the findByPk method to return null

    await updateReview(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ success: false, error: "Review not found" });
  });

  it('should return 403 if user is unauthorized to update the review', async () => {
    const req = { params: { id: 1 }, body: { userId: 2, comment: 'Updated comment' } };
    const res = mockResponse();
    _findByPk.mockResolvedValue({ id: 1, userId: 1 }); // Mock the findByPk method

    await updateReview(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ success: false, error: "Unauthorized to edit this review" });
  });

  it('should return 500 if an error occurs while updating a review', async () => {
    const req = { params: { id: 1 }, body: { userId: 1, comment: 'Updated comment' } };
    const res = mockResponse();
    _findByPk.mockResolvedValue({ id: 1, userId: 1, comment: 'Old comment', save: jest.fn() });
    jest.spyOn(res, 'json').mockImplementation(() => { throw new Error('Error saving review'); }); // Simulate an error

    await updateReview(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ success: false, error: "Failed to update review" });
  });
});