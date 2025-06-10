import { Router } from 'express';

import GoalController from '@/interfaces/http/controllers/GoalController';

const goalsRouter = Router();

/**
 * @swagger
 * /goals:
 *   get:
 *     summary: Lista todas as metas
 *     tags: [Goals]
 *     responses:
 *       200:
 *         description: Lista de metas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Goal'
 *   post:
 *     summary: Cria uma nova meta
 *     tags: [Goals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Goal'
 *     responses:
 *       201:
 *         description: Meta criada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Goal'
 *
 * /goals/{id}:
 *   get:
 *     summary: Busca uma meta pelo ID
 *     tags: [Goals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Meta encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Goal'
 *   put:
 *     summary: Atualiza uma meta
 *     tags: [Goals]
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
 *             $ref: '#/components/schemas/Goal'
 *     responses:
 *       200:
 *         description: Meta atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Goal'
 */

goalsRouter.get('/', async (req, res, next) => {
  try {
    const goals = await GoalController.listGoals();
    res.json(goals);
  } catch (error) {
    next(error);
  }
});

goalsRouter.post('/', async (req, res, next) => {
  try {
    const goal = await GoalController.createGoal(req);
    res.status(201).json(goal);
  } catch (error) {
    next(error);
  }
});

goalsRouter.get('/:id', async (req, res, next) => {
  try {
    const goal = await GoalController.showGoal(req);
    res.json(goal);
  } catch (error) {
    next(error);
  }
});

goalsRouter.put('/:id', async (req, res, next) => {
  try {
    const goal = await GoalController.updateGoal(req);
    res.json(goal);
  } catch (error) {
    next(error);
  }
});

export default goalsRouter;
