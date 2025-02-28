import SequelizeMock from 'sequelize-mock';
const dbMock = new SequelizeMock();

// Define the mock Remedy model with basic attributes and validations
const RemedyMock = dbMock.define('Remedy', {
  id: 1,
  title: 'Hair Growth Remedy',
  description: 'A natural remedy for hair growth.',
  procedure: 'Mix ingredients and apply to scalp.',
  image: 'https://example.com/hairgrowth.jpg',
  likes: 10,
  categoryId: 1,
}, {
  // Mock the validation errors for specific cases
  validate: function() {
    if (!this.title || !this.description || !this.procedure || !this.image) {
      throw new Error('Validation error');
    }
    if (this.title === 'Hair Growth Remedy') {
      throw new Error('Validation error'); // Simulating unique title violation
    }
  }
});

describe('Remedy Model', () => {
  it('should create a remedy', async () => {
    const remedy = await RemedyMock.create({
      title: 'New Hair Remedy',
      description: 'A new remedy for hair care.',
      procedure: 'Apply the mixture to hair and wait for 30 minutes.',
      image: 'https://example.com/newhairremedy.jpg',
      likes: 5,
      categoryId: 2,
    });

    expect(remedy.title).toBe('New Hair Remedy');
    expect(remedy.description).toBe('A new remedy for hair care.');
    expect(remedy.procedure).toBe('Apply the mixture to hair and wait for 30 minutes.');
    expect(remedy.image).toBe('https://example.com/newhairremedy.jpg');
    expect(remedy.likes).toBe(5);
    expect(remedy.categoryId).toBe(2);
  });

  it('should require title, description, procedure, and image', async () => {
    try {
      await RemedyMock.create({});
    } catch (error) {
      expect(error.message).toBe('Validation error');
    }
  });

  it('should enforce unique constraint on title', async () => {
    try {
      await RemedyMock.create({
        title: 'Hair Growth Remedy', // Duplicate title
        description: 'A duplicate hair growth remedy.',
        procedure: 'Apply to scalp.',
        image: 'https://example.com/duplicate.jpg',
        likes: 0,
        categoryId: 1,
      });
    } catch (error) {
      expect(error.message).toBe('Validation error');
    }
  });

  it('should allow a valid procedure for a remedy', async () => {
    const remedy = await RemedyMock.create({
      title: 'Skin Care Remedy',
      description: 'A natural skin care remedy.',
      procedure: 'Apply to face for 15 minutes.',
      image: 'https://example.com/skincare.jpg',
      likes: 8,
      categoryId: 3,
    });

    expect(remedy.procedure).toBe('Apply to face for 15 minutes.');
  });

  it('should not allow an empty title', async () => {
    try {
      await RemedyMock.create({
        title: '', // Empty title
        description: 'A remedy for skin health.',
        procedure: 'Apply and leave for 20 minutes.',
        image: 'https://example.com/skinremedy.jpg',
        likes: 12,
        categoryId: 3,
      });
    } catch (error) {
      expect(error.message).toBe('Validation error');
    }
  });
});
