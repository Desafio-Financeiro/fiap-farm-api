import { ProductionRepository } from '@/domain/repositories/ProductionRepository';

export class ListProductionUseCase {
  constructor(private productionRepository: ProductionRepository) {}

  async execute() {
    return this.productionRepository.listProductions();
  }
}
