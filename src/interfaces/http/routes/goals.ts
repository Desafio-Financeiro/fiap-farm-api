import { Router } from 'express';
import GoalController from '@/interfaces/http/controllers/GoalController';

const goalRouter = Router();

goalRouter.get('/', async (req, res, next) => {
  try {
    const goals = await GoalController.listGoals();
    res.json(goals);
  } catch (error) {
    next(error);
  }
});

goalRouter.post('/', async (req, res, next) => {
  try {
    const goal = await GoalController.createGoal(req);
    res.status(201).json(goal);
  } catch (error) {
    next(error);
  }
});

goalRouter.get('/:id', async (req, res, next) => {
  try {
    const goal = await GoalController.showGoal(req);
    res.json(goal);
  } catch (error) {
    next(error);
  }
});

goalRouter.put('/:id', async (req, res, next) => {
  try {
    const goal = await GoalController.updateGoal(req);
    res.json(goal);
  } catch (error) {
    next(error);
  }
});

export default goalRouter;
