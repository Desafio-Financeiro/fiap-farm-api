import { Router } from 'express';
import SaleController from '@/interfaces/http/controllers/SaleController';

const saleRouter = Router();

saleRouter.get('/', async (req, res, next) => {
  try {
    const sales = await SaleController.listSales();
    res.json(sales);
  } catch (error) {
    next(error);
  }
});

saleRouter.post('/', async (req, res, next) => {
  try {
    const sale = await SaleController.createSale(req);
    res.status(201).json(sale);
  } catch (error) {
    next(error);
  }
});

saleRouter.get('/:id', async (req, res, next) => {
  try {
    const sale = await SaleController.showSale(req);
    res.json(sale);
  } catch (error) {
    next(error);
  }
});

saleRouter.put('/:id', async (req, res, next) => {
  try {
    const sale = await SaleController.updateSale(req);
    res.json(sale);
  } catch (error) {
    next(error);
  }
});

export default saleRouter;
