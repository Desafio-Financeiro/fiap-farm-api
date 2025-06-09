import { Router } from 'express';

import SaleController from '@/interfaces/http/controllers/SaleController';

const saleRouter = Router();

/**
 * @swagger
 * /sales:
 *   get:
 *     summary: Lista todas as vendas
 *     tags: [Sales]
 *     responses:
 *       200:
 *         description: Lista de vendas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sale'
 *   post:
 *     summary: Cria uma nova venda
 *     tags: [Sales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sale'
 *     responses:
 *       201:
 *         description: Venda criada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 *
 * /sales/{id}:
 *   get:
 *     summary: Busca uma venda pelo ID
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Venda encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 *   put:
 *     summary: Atualiza uma venda
 *     tags: [Sales]
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
 *             $ref: '#/components/schemas/Sale'
 *     responses:
 *       200:
 *         description: Venda atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 */

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
