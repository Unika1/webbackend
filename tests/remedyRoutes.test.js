import request from 'supertest';
import app from '../server'; // Import Express app

describe('Remedy API Endpoints', () => {
  let remedyId;

  it('should create a remedy', async () => {
    const res = await request(app)
      .post('/api/remedies')
      .set('Authorization', 'Bearer <admin_token>') // Assuming admin token
      .attach('image', 'path/to/image.jpg') // Attach an image if needed
      .send({ title: 'Test Remedy', description: 'Test Description', procedure: 'Test Procedure', categoryId: 1 });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    remedyId = res.body.id;
  });

  it('should get all remedies', async () => {
    const res = await request(app).get('/api/remedies');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get a remedy by ID', async () => {
    const res = await request(app).get(`/api/remedies/${remedyId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', remedyId);
  });

  it('should get remedies by category', async () => {
    const res = await request(app).get('/api/remedies/category/1'); // Assuming categoryId 1 exists
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update a remedy', async () => {
    const res = await request(app)
      .put(`/api/remedies/${remedyId}`)
      .set('Authorization', 'Bearer <admin_token>') // Assuming admin token
      .attach('image', 'path/to/updated_image.jpg') // Attach an updated image if needed
      .send({ title: 'Updated Remedy', description: 'Updated Description', procedure: 'Updated Procedure' });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Updated Remedy');
  });

  it('should delete a remedy', async () => {
    const res = await request(app)
      .delete(`/api/remedies/${remedyId}`)
      .set('Authorization', 'Bearer <admin_token>'); // Assuming admin token
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Remedy deleted successfully');
  });
});
