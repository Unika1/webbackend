import { createProduct, getAllProducts, getProductById } from '../controllers/productController';
import { create as _create, findAll as _findAll, findByPk as _findByPk } from '../model/Product';

// Mock Sequelize Methods
jest.mock('../model/Product', () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
}));

describe('Product Controller', () => {
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  it('should create a new product', async () => {
    const req = { body: { productName: 'Test Product', price: 99.99, description: 'Test Desc' } };
    const res = mockResponse();
    _create.mockResolvedValue(req.body);

    await createProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining(req.body));
  });

  it('should return all products', async () => {
    const req = {};
    const res = mockResponse();
    _findAll.mockResolvedValue([{ id: 1, productName: 'Test Product' }]);

    await getAllProducts(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([{ id: 1, productName: 'Test Product' }]));
  });

  it('should return a product by ID', async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();
    _findByPk.mockResolvedValue({ id: 1, productName: 'Test Product' });

    await getProductById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
  });

  it('should return 404 if product not found', async () => {
    const req = { params: { id: 2 } };
    const res = mockResponse();
    _findByPk.mockResolvedValue(null);

    await getProductById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Product not found' });
  });
});
