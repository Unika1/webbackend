import request from 'supertest';
import app from '../server'; // Import Express app

describe('Review API Endpoints', () => {
  let reviewId;

  it('should add a review', async () => {
    const res = await request(app)
      .post('/api/reviews')
      .send({
        remedyId: 1,  // Assuming remedyId 1 exists
        userId: 123,  // Assuming userId 123 exists
        username: 'TestUser',
        comment: 'This is a test review',
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('review');
    reviewId = res.body.review.id;  // Save the created review ID for further tests
  });

  it('should get reviews for a remedy', async () => {
    const res = await request(app).get(`/api/reviews/1`);  // Assuming remedyId 1 exists
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update a review', async () => {
    const res = await request(app)
      .put(`/api/reviews/${reviewId}`)
      .send({ userId: 123, comment: 'Updated test review comment' });  // Update the comment

    expect(res.status).toBe(200);
    expect(res.body.comment).toBe('Updated test review comment');
  });

  it('should return 403 if user tries to update another user\'s review', async () => {
    const res = await request(app)
      .put(`/api/reviews/${reviewId}`)
      .send({ userId: 999, comment: 'Updated test review comment by another user' });  // Trying to update with different userId

    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty('error', 'Unauthorized to edit this review');
  });

  it('should delete a review', async () => {
    const res = await request(app)
      .delete(`/api/reviews/${reviewId}`)
      .query({ userId: 123 });  // Send userId as a query param

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Review deleted successfully');
  });

  it('should return 403 if user tries to delete another user\'s review', async () => {
    const res = await request(app)
      .delete(`/api/reviews/${reviewId}`)
      .query({ userId: 999 });  // Trying to delete with different userId

    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty('error', 'Unauthorized to delete this review');
  });
});
