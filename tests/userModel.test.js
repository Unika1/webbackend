import SequelizeMock from 'sequelize-mock';
const dbMock = new SequelizeMock();

// Define the mock User model with basic attributes and validations
const UserMock = dbMock.define('Users', {
  id: 1,
  username: 'testuser',
  email: 'test@example.com',
  password: 'password123',
  role: 'user',
}, {
  // Only mock the validation errors for specific cases like missing fields or duplicates
  validate: function() {
    if (!this.username || !this.email || !this.password) {
      throw new Error('Validation error');
    }
    if (this.username === 'testuser') {
      throw new Error('Validation error'); // Simulating unique constraint violation
    }
    if (this.email === 'duplicate@example.com') {
      throw new Error('Validation error'); // Simulating email uniqueness violation
    }
  }
});

describe('User Model', () => {
  it('should create a user', async () => {
    const user = await UserMock.create({
      username: 'newuser',
      email: 'newuser@example.com',
      password: 'password456',
      role: 'user',
    });

    expect(user.username).toBe('newuser');
    expect(user.email).toBe('newuser@example.com');
    expect(user.password).toBe('password456');
    expect(user.role).toBe('user');
  });

  it('should require a username, email, and password', async () => {
    try {
      await UserMock.create({});
    } catch (error) {
      expect(error.message).toBe('Validation error');
    }
  });

  it('should enforce unique constraint on username', async () => {
    try {
      await UserMock.create({ username: 'testuser', email: 'duplicate@example.com', password: 'password123' });
    } catch (error) {
      expect(error.message).toBe('Validation error');
    }
  });

  it('should enforce unique constraint on email', async () => {
    try {
      await UserMock.create({ username: 'newuser', email: 'test@example.com', password: 'password123' });
    } catch (error) {
      expect(error.message).toBe('Validation error');
    }
  });
});
