import { Router } from 'express';
import GoalController from '@/interfaces/http/controllers/GoalController';

const goalsRouter = Router();

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
