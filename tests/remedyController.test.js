import {
    getAllRemedies,
    addRemedy,
    updateRemedy,
    deleteRemedy,
    getRemedyById,
    getRemediesByCategory,
  } from '../controllers/remedyController.js';
  import Remedy from '../model/Remedy.js';
  
  // Mock Sequelize Methods
  jest.mock('../model/Remedy', () => ({
    findAll: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn(),
    destroy: jest.fn(),
  }));
  
  describe('Remedy Controller', () => {
    const mockResponse = () => {
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      return res;
    };
  
    it('should get all remedies', async () => {
      const req = {};
      const res = mockResponse();
      const mockRemedies = [{ id: 1, title: 'Remedy 1' }, { id: 2, title: 'Remedy 2' }];
      Remedy.findAll.mockResolvedValue(mockRemedies); // Mock the findAll method
  
      await getAllRemedies(req, res);
  
      expect(res.json).toHaveBeenCalledWith(mockRemedies);
    });
  
    it('should return 500 if an error occurs while fetching remedies', async () => {
      const req = {};
      const res = mockResponse();
      Remedy.findAll.mockRejectedValue(new Error('Database error')); // Simulate an error
  
      await getAllRemedies(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch remedies' });
    });
  
    it('should add a new remedy', async () => {
      const req = {
        body: {
          title: 'New Remedy',
          description: 'Description of new remedy',
          procedure: 'Procedure for new remedy',
          categoryId: 1,
        },
        file: { filename: 'image.png' },
      };
      const res = mockResponse();
      const newRemedy = { id: 1, ...req.body, image: req.file.filename };
      Remedy.create.mockResolvedValue(newRemedy); // Mock the create method
  
      await addRemedy(req, res);
  
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newRemedy);
    });
  
    it('should return 500 if an error occurs while adding a remedy', async () => {
      const req = {
        body: {
          title: 'New Remedy',
          description: 'Description of new remedy',
          procedure: 'Procedure for new remedy',
          categoryId: 1,
        },
        file: { filename: 'image.png' },
      };
      const res = mockResponse();
      Remedy.create.mockRejectedValue(new Error('Database error')); // Simulate an error
  
      await addRemedy(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to add remedyy', details: 'Database error' });
    });
  
    it('should update a remedy', async () => {
      const req = {
        params: { id: 1 },
        body: {
          title: 'Updated Remedy',
          description: 'Updated description',
          procedure: 'Updated procedure',
          categoryId: 1,
        },
        file: { filename: 'updated_image.png' },
      };
      const res = mockResponse();
      const existingRemedy = { id: 1, title: 'Old Remedy', save: jest.fn() };
      Remedy.findByPk.mockResolvedValue(existingRemedy); // Mock the findByPk method
  
      await updateRemedy(req, res);
  
      expect(existingRemedy.title).toBe(req.body.title);
      expect(existingRemedy.description).toBe(req.body.description);
      expect(existingRemedy.procedure).toBe(req.body.procedure);
      expect(existingRemedy.categoryId).toBe(req.body.categoryId);
      expect(existingRemedy.image).toBe(req.file.filename);
      expect(existingRemedy.save).toHaveBeenCalled(); // Ensure save was called
      expect(res.json).toHaveBeenCalledWith(existingRemedy);
    });
  
    it('should return 404 if remedy not found on update', async () => {
      const req = { params: { id: 2 }, body: {} };
      const res = mockResponse();
      Remedy.findByPk.mockResolvedValue(null); // Mock the findByPk method to return null
  
      await updateRemedy(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Remedy not found" });
    });
  
    it('should delete a remedy', async () => {
      const req = { params: { id: 1 } };
      const res = mockResponse();
      const existingRemedy = { id: 1, destroy: jest.fn() };
      Remedy.findByPk.mockResolvedValue(existingRemedy); // Mock the findByPk method
  
      await deleteRemedy(req, res);
  
      expect(existingRemedy.destroy).toHaveBeenCalled(); // Ensure destroy was called
      expect(res.json).toHaveBeenCalledWith({ message: "Remedy deleted successfully" });
    });
  
    it('should return 404 if remedy not found on delete', async () => {
      const req = { params: { id: 2 } };
      const res = mockResponse();
      Remedy.findByPk.mockResolvedValue(null); // Mock the findByPk method to return null
  
      await deleteRemedy(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Remedy not found" });
    });
  
    it('should get a remedy by ID', async () => {
      const req = { params: { id: 1 } };
      const res = mockResponse();
      const mockRemedy = { id: 1, title: 'Remedy 1' };
      Remedy.findByPk.mockResolvedValue(mockRemedy); // Mock the findByPk method
  
      await getRemedyById(req, res);
  
      expect(res.json).toHaveBeenCalledWith(mockRemedy);
    });
  
    it('should return 404 if remedy not found by ID', async () => {
      const req = { params: { id: 2 } };
      const res = mockResponse();
      Remedy.findByPk.mockResolvedValue(null); // Mock the findByPk method to return null
  
      await getRemedyById(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Remedy not found" });
    });
  
    it('should get remedies by category', async () => {
      const req = { params: { categoryId: 1 } };
      const res = mockResponse();
      const mockRemedies = [{ id: 1, title: 'Remedy 1' }, { id: 2, title: 'Remedy 2' }];
      Remedy.findAll.mockResolvedValue(mockRemedies); // Mock the findAll method
  
      await getRemediesByCategory(req, res);
  
      expect(res.json).toHaveBeenCalledWith(mockRemedies);
    });
  
    it('should return 500 if an error occurs while fetching remedies by category', async () => {
      const req = { params: { categoryId: 1 } };
      const res = mockResponse();
      Remedy.findAll.mockRejectedValue(new Error('Database error')); // Simulate an error
  
      await getRemediesByCategory(req, res);
  
   expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch remedies by category', details: 'Database error' });
    });
  });