import { Router } from 'express';
import ProductionController from '@/interfaces/http/controllers/ProductionController';

const productionRouter = Router();

productionRouter.get('/', async (req, res, next) => {
  try {
    const productions = await ProductionController.listProductions();
    res.json(productions);
  } catch (error) {
    next(error);
  }
});

productionRouter.post('/', async (req, res, next) => {
  try {
    const production = await ProductionController.createProduction(req);
    res.status(201).json(production);
  } catch (error) {
    next(error);
  }
});

productionRouter.get('/:id', async (req, res, next) => {
  try {
    const production = await ProductionController.showProduction(req);
    res.json(production);
  } catch (error) {
    next(error);
  }
});

productionRouter.put('/:id', async (req, res, next) => {
  try {
    const production = await ProductionController.updateProduction(req);
    res.json(production);
  } catch (error) {
    next(error);
  }
});

export default productionRouter;
