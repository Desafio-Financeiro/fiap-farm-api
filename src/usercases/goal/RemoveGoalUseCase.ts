import { GoalRepository } from '@/domain/repositories/GoalRepository';
import { Goal } from '@/domain/entities/Goal';

export class RemoveGoalUseCase {
  constructor(private goalRepository: GoalRepository) {}

  async execute(id: Goal['uid']) {
    return this.goalRepository.deleteGoal(id);
  }
}
