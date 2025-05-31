import { Router } from 'express';
import ProductionController from '@/interfaces/http/controllers/ProductionController';

const productionsRouter = Router();

productionsRouter.get('/', async (req, res, next) => {
  try {
    const productions = await ProductionController.listProductions();
    res.json(productions);
  } catch (error) {
    next(error);
  }
});

productionsRouter.post('/', async (req, res, next) => {
  try {
    const production = await ProductionController.createProduction(req);
    res.status(201).json(production);
  } catch (error) {
    next(error);
  }
});

productionsRouter.get('/:id', async (req, res, next) => {
  try {
    const production = await ProductionController.showProduction(req);
    res.json(production);
  } catch (error) {
    next(error);
  }
});

productionsRouter.put('/:id', async (req, res, next) => {
  try {
    const production = await ProductionController.updateProduction(req);
    res.json(production);
  } catch (error) {
    next(error);
  }
});

export default productionsRouter;
