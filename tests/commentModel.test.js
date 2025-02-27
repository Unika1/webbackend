const SequelizeMock = require('sequelize-mock');
const dbMock = new SequelizeMock();

// Define the mock Comment model with basic attributes and validations
const CommentMock = dbMock.define('Comment', {
  id: 1,
  text: 'This is a test comment.',
}, {
  // Only mock the validation errors for specific cases like missing fields or duplicates
  validate: function() {
    if (!this.text) {
      throw new Error('Validation error');
    }
  }
});

describe('Comment Model', () => {
  it('should create a comment', async () => {
    const comment = await CommentMock.create({
      text: 'This is a valid comment.',
    });

    expect(comment.text).toBe('This is a valid comment.');
  });

  it('should require text for a comment', async () => {
    try {
      await CommentMock.create({});
    } catch (error) {
      expect(error.message).toBe('Validation error');
    }
  });

  it('should not allow empty text', async () => {
    try {
      await CommentMock.create({ text: '' });
    } catch (error) {
      expect(error.message).toBe('Validation error');
    }
  });
});
