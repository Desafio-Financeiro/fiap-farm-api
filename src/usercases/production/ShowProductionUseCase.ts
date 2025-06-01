import { ProductionRepository } from '@/domain/repositories/ProductionRepository';
import { Production } from '@/domain/entities/Production';

export class ShowProductionUseCase {
  constructor(private productionRepository: ProductionRepository) {}

  async execute(id: Production['uid']) {
    return this.productionRepository.getProductionById(id);
  }
}
