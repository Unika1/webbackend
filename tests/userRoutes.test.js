const request = require('supertest');
const app = require('../server'); // Import Express app

describe('User API Endpoints', () => {
  let userId;

  it('should register a user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        username: 'TestUser',
        email: 'testuser@example.com',
        password: 'password123',
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('username', 'TestUser');
    userId = res.body.id;  // Save the created user ID for further tests
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');  // Assuming a JWT token is returned
  });

  it('should get user information', async () => {
    const res = await request(app).get(`/api/users/view_users`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users/create_users')
      .send({
        username: 'NewUser',
        email: 'newuser@example.com',
        password: 'newpassword123',
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('username', 'NewUser');
  });

  it('should update user information', async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .send({ username: 'UpdatedUser', email: 'updateduser@example.com' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('username', 'UpdatedUser');
  });

  it('should delete a user', async () => {
    const res = await request(app).delete(`/api/users/${userId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'User deleted successfully');
  });

  it('should return 404 if user not found for update', async () => {
    const res = await request(app)
      .put('/api/users/9999')  // Non-existent user ID
      .send({ username: 'NonExistentUser' });

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error', 'User not found');
  });

  it('should return 404 if user not found for delete', async () => {
    const res = await request(app)
      .delete('/api/users/9999')  // Non-existent user ID
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error', 'User not found');
  });
});
