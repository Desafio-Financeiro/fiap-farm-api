import { Router } from 'express';

import ProductionController from '@/interfaces/http/controllers/ProductionController';

const productionsRouter = Router();

/**
 * @swagger
 * /productions:
 *   get:
 *     summary: Lista todas as produções
 *     tags: [Productions]
 *     responses:
 *       200:
 *         description: Lista de produções
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Production'
 *   post:
 *     summary: Cria uma nova produção
 *     tags: [Productions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Production'
 *     responses:
 *       201:
 *         description: Produção criada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Production'
 *
 * /productions/{id}:
 *   get:
 *     summary: Busca uma produção pelo ID
 *     tags: [Productions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produção encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Production'
 *   put:
 *     summary: Atualiza uma produção
 *     tags: [Productions]
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
 *             $ref: '#/components/schemas/Production'
 *     responses:
 *       200:
 *         description: Produção atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Production'
 */

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
