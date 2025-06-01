import { Router } from 'express';
import ProductController from '@/interfaces/http/controllers/ProductController';

const productRouter = Router();

productRouter.get('/', async (req, res, next) => {
  try {
    const products = await ProductController.listProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

productRouter.post('/', async (req, res, next) => {
  try {
    const product = await ProductController.createProduct(req);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

productRouter.get('/:id', async (req, res, next) => {
  try {
    const product = await ProductController.showProduct(req);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

productRouter.put('/:id', async (req, res, next) => {
  try {
    const product = await ProductController.updateProduct(req);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

productRouter.delete('/:id', async (req, res, next) => {
  try {
    await ProductController.removeProduct(req);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default productRouter;
