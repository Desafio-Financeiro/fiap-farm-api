import { Router } from 'express';
import InventoryMovementController from '@/interfaces/http/controllers/InventoryMovementController';

const inventoryMovementRouter = Router();

inventoryMovementRouter.get('/', async (req, res, next) => {
  try {
    const inventoryMovements =
      await InventoryMovementController.listInventoryMovements();
    res.json(inventoryMovements);
  } catch (error) {
    next(error);
  }
});

inventoryMovementRouter.post('/', async (req, res, next) => {
  try {
    const inventoryMovement =
      await InventoryMovementController.createInventoryMovement(req);
    res.status(201).json(inventoryMovement);
  } catch (error) {
    next(error);
  }
});

inventoryMovementRouter.get('/:id', async (req, res, next) => {
  try {
    const inventoryMovement =
      await InventoryMovementController.showInventoryMovement(req);
    res.json(inventoryMovement);
  } catch (error) {
    next(error);
  }
});

inventoryMovementRouter.put('/:id', async (req, res, next) => {
  try {
    const inventoryMovement =
      await InventoryMovementController.updateInventoryMovement(req);
    res.json(inventoryMovement);
  } catch (error) {
    next(error);
  }
});

export default inventoryMovementRouter;
