import { GoalRepository } from '@/domain/repositories/GoalRepository';

export class ListGoalUseCase {
  constructor(private goalRepository: GoalRepository) {}

  async execute() {
    return this.goalRepository.listGoals();
  }
}
