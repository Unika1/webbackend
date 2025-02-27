import { registerUser, loginUser } from '../controllers/userController.js';
import { create as _create, findOne as _findOne } from '../model/User.js';
import { hash as _hash, compare as _compare } from 'bcrypt';
import { sign as _sign } from 'jsonwebtoken';

// Mock Sequelize Methods
jest.mock('../model/User', () => ({
  create: jest.fn(),
  findOne: jest.fn(),
}));

// Mock bcrypt and jwt
jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

describe('User Controller', () => {
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  it('should register a new user', async () => {
    const req = {
      body: { fullname: 'John Doe', email: 'john@example.com', password: 'password123', isRole: 'user' },
    };
    const res = mockResponse();
    _create.mockResolvedValue(req.body);  // Mocking that the user is created
    _hash.mockResolvedValue('hashedpassword');  // Mocking bcrypt hash

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Registration Successful.....' });
  });

  it('should return 400 if username or password is missing during registration', async () => {
    const req = { body: { email: 'john@example.com', password: 'password123' } }; // Missing username
    const res = mockResponse();

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Please Insert username and password' });
  });

  it('should login a user successfully', async () => {
    const req = {
      body: { username: 'john_doe', password: 'password123' },
    };
    const res = mockResponse();
    _findOne.mockResolvedValue({ username: 'john_doe', password: 'hashedpassword' });  // Mocking user data
    _compare.mockResolvedValue(true);  // Mocking bcrypt compare
    _sign.mockReturnValue('token123');  // Mocking jwt sign

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Successfully Logged in',
      token: 'token123',
    });
  });

  it('should return 400 if username or password is missing during login', async () => {
    const req = { body: { username: 'john_doe' } }; // Missing password
    const res = mockResponse();

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Please Insert username and password' });
  });

  it('should return 400 if user not found during login', async () => {
    const req = {
      body: { username: 'john_doe', password: 'password123' },
    };
    const res = mockResponse();
    _findOne.mockResolvedValue(null);  // Mocking no user found

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'New user required' });
  });

  it('should return 400 if password is incorrect during login', async () => {
    const req = {
      body: { username: 'john_doe', password: 'password123' },
    };
    const res = mockResponse();
    _findOne.mockResolvedValue({ username: 'john_doe', password: 'hashedpassword' });
    _compare.mockResolvedValue(false);  // Mocking incorrect password

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Insert proper password!!!!' });
  });
});
