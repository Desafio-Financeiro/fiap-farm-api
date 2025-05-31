import { Goal } from '@/domain/entities/Goal';

export interface GoalRepository {
  listGoals(): Promise<Goal[]>;

  getGoalById(uid: Goal['uid']): Promise<Goal | null>;

  createGoal(goal: Goal): Promise<Goal>;

  updateGoal(goal: Goal): Promise<Goal>;

  deleteGoal(uid: Goal['uid']): Promise<void>;
}
