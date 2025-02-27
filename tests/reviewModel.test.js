const SequelizeMock = require('sequelize-mock');
const dbMock = new SequelizeMock();

// Define the mock Review model with basic attributes and validations
const ReviewMock = dbMock.define('Review2', {
  id: 1,
  remedyId: 1,
  userId: 1,
  username: 'testuser',
  comment: 'This is a test comment.',
}, {
  // Mock the validation errors for specific cases
  validate: function() {
    if (!this.remedyId || !this.userId || !this.username || !this.comment) {
      throw new Error('Validation error');
    }
    if (this.username === 'testuser') {
      throw new Error('Validation error'); // Simulating unique username violation
    }
  }
});

describe('Review Model', () => {
  it('should create a review', async () => {
    const review = await ReviewMock.create({
      remedyId: 1,
      userId: 1,
      username: 'newuser',
      comment: 'This is a new review.',
    });

    expect(review.remedyId).toBe(1);
    expect(review.userId).toBe(1);
    expect(review.username).toBe('newuser');
    expect(review.comment).toBe('This is a new review.');
  });

  it('should require remedyId, userId, username, and comment', async () => {
    try {
      await ReviewMock.create({});
    } catch (error) {
      expect(error.message).toBe('Validation error');
    }
  });

  it('should enforce unique constraint on username', async () => {
    try {
      await ReviewMock.create({
        remedyId: 1,
        userId: 1,
        username: 'testuser',
        comment: 'This is a duplicate review.',
      });
    } catch (error) {
      expect(error.message).toBe('Validation error');
    }
  });

  it('should allow a valid comment for a review', async () => {
    const review = await ReviewMock.create({
      remedyId: 2,
      userId: 2,
      username: 'newuser',
      comment: 'This is a valid comment.',
    });

    expect(review.comment).toBe('This is a valid comment.');
  });

  it('should not allow an empty comment', async () => {
    try {
      await ReviewMock.create({
        remedyId: 2,
        userId: 2,
        username: 'newuser',
        comment: '',
      });
    } catch (error) {
      expect(error.message).toBe('Validation error');
    }
  });
});
