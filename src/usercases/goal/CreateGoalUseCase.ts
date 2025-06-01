import { GoalRepository } from '@/domain/repositories/GoalRepository';
import { Goal } from '@/domain/entities/Goal';

export class CreateGoalUseCase {
  constructor(private goalRepository: GoalRepository) {}

  async execute(goal: Goal) {
    return this.goalRepository.createGoal(goal);
  }
}
