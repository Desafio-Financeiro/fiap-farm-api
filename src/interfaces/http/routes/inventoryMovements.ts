import { Router } from 'express';

import InventoryMovementController from '@/interfaces/http/controllers/InventoryMovementController';

const inventoryMovementRouter = Router();

/**
 * @swagger
 * /inventory-movements:
 *   get:
 *     summary: Lista todas as movimentações de estoque
 *     tags: [InventoryMovements]
 *     responses:
 *       200:
 *         description: Lista de movimentações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InventoryMovement'
 *   post:
 *     summary: Cria uma nova movimentação de estoque
 *     tags: [InventoryMovements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InventoryMovement'
 *     responses:
 *       201:
 *         description: Movimentação criada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InventoryMovement'
 *
 * /inventory-movements/{id}:
 *   get:
 *     summary: Busca uma movimentação pelo ID
 *     tags: [InventoryMovements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movimentação encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InventoryMovement'
 *   put:
 *     summary: Atualiza uma movimentação
 *     tags: [InventoryMovements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InventoryMovement'
 *     responses:
 *       200:
 *         description: Movimentação atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InventoryMovement'
 */

inventoryMovementRouter.get('/', async (req, res, next) => {
  try {
    const inventoryMovements = await InventoryMovementController.listInventoryMovements();
    res.json(inventoryMovements);
  } catch (error) {
    next(error);
  }
});

inventoryMovementRouter.post('/', async (req, res, next) => {
  try {
    const inventoryMovement = await InventoryMovementController.createInventoryMovement(req);
    res.status(201).json(inventoryMovement);
  } catch (error) {
    next(error);
  }
});

inventoryMovementRouter.get('/:id', async (req, res, next) => {
  try {
    const inventoryMovement = await InventoryMovementController.showInventoryMovement(req);
    res.json(inventoryMovement);
  } catch (error) {
    next(error);
  }
});

inventoryMovementRouter.put('/:id', async (req, res, next) => {
  try {
    const inventoryMovement = await InventoryMovementController.updateInventoryMovement(req);
    res.json(inventoryMovement);
  } catch (error) {
    next(error);
  }
});

inventoryMovementRouter.delete('/:id', async (req, res, next) => {
  try {
    await InventoryMovementController.removeInventoryMovement(req);
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
});

export default inventoryMovementRouter;

