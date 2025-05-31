import { GoalRepositoryFirebase } from '@/infra/firebase/GoalRepositoryFirebase';
import { ListGoalUseCase } from '@/usercases/goal/ListGoalUseCase';
import { UpdateGoalUseCase } from '@/usercases/goal/UpdateGoalUseCase';
import { CreateGoalUseCase } from '@/usercases/goal/CreateGoalUseCase';
import { ShowGoalUseCase } from '@/usercases/goal/ShowGoalUseCase';
import { RemoveGoalUseCase } from '@/usercases/goal/RemoveGoalUseCase';
import { verifyProductExists } from '@/interfaces/http/controllers/ProductController';
import { Goal } from '@/domain/entities/Goal';
import { Request } from 'express';

const goalRepo = new GoalRepositoryFirebase();
const listGoalUseCase = new ListGoalUseCase(goalRepo);
const createGoalUseCase = new CreateGoalUseCase(goalRepo);
const removeGoalUseCase = new RemoveGoalUseCase(goalRepo);
const showGoalUseCase = new ShowGoalUseCase(goalRepo);
const updateGoalUseCase = new UpdateGoalUseCase(goalRepo);

const listGoals = async () => {
  return await listGoalUseCase.execute();
};

const createGoal = async (req: Request) => {
  const goal: Goal = req.body;
  if (!goal.productId) {
    throw new Error('Product ID is required for creating a goal');
  }
  await verifyProductExists(goal.productId);

  return await createGoalUseCase.execute(goal);
};

const showGoal = async (req: Request) => {
  const id = req.params.id;
  return await showGoalUseCase.execute(id);
};

const updateGoal = async (req: Request) => {
  const goalId = req.params.id;
  const goal: Goal = req.body;
  const existingGoal = await showGoalUseCase.execute(goalId);

  if (!existingGoal) {
    throw new Error(`Goal with id ${goalId} not found`);
  }

  await verifyProductExists(goal.productId);

  const newGoal = { ...existingGoal, ...goal };

  return await updateGoalUseCase.execute(newGoal);
};

const removeGoal = async (req: Request) => {
  const id = req.params.id;
  return await removeGoalUseCase.execute(id);
};

const GoalController = {
  listGoals,
  createGoal,
  showGoal,
  updateGoal,
  removeGoal,
};

export default GoalController;
