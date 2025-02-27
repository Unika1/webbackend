import userController from '../controllers/userController.js';
const { registerUser, loginUser } = userController;
import { User } from '../model/User.js'; // Assuming User is being imported correctly

// Mocking User methods
jest.mock('../model/User');
User.findOne = jest.fn();
User.create = jest.fn();

// Mock the response object
const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe('User Controller', () => {
  it('should register a new user', async () => {
    // Mock the data
    const req = {
      body: {
        username: 'testuser',
        fullname: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        isRole: 'user',
      },
    };

    // Mock User.findOne to return null (no user found)
    User.findOne.mockResolvedValue(null);

    // Mock User.create to return a mock user object
    User.create.mockResolvedValue({
      id: 1,
      username: 'testuser',
      fullname: 'Test User',
    });

    await registerUser(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Registration Successful' })
    );
  });

  it('should login a user', async () => {
    const req = {
      body: {
        username: 'testuser',
        password: 'password123',
      },
    };

    // Mock User.findOne to return a mock user
    User.findOne.mockResolvedValue({
      id: 1,
      username: 'testuser',
      password: '$2b$10$V0uoNU8FVhP7GfbEXQRP3eD0H1lOwPFXgTpZah0X/p90K1INhFXOa', // hashed password
    });

    // Mock bcrypt.compare to return true (password matches)
    bcrypt.compare = jest.fn().mockResolvedValue(true);

    await loginUser(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Successfully Logged in' })
    );
  });
});
