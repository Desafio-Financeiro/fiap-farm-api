import { ProductionRepository } from '@/domain/repositories/ProductionRepository';
import { Production } from '@/domain/entities/Production';

export class CreateProductionUseCase {
  constructor(private productionRepository: ProductionRepository) {}

  async execute(production: Production) {
    return this.productionRepository.createProduction(production);
  }
}
