import { GoalRepository } from '@/domain/repositories/GoalRepository';
import { Goal } from '@/domain/entities/Goal';

export class ShowGoalUseCase {
  constructor(private goalRepository: GoalRepository) {}

  async execute(id: Goal['uid']) {
    return this.goalRepository.getGoalById(id);
  }
}
