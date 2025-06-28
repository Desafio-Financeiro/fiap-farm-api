import { CostPerKgRequest, CostPerKgResponse } from '@/interfaces/http/dtos/MetricsDTO';
import { ProductionRepository } from '@/domain/repositories/ProductionRepository';
import { StatusProduction } from '@/domain/entities/Production';

export class CostPerKgUseCase {
  constructor(private productionRepository: ProductionRepository) {}

  async execute({ productId }: CostPerKgRequest): Promise<CostPerKgResponse> {
    const productions = await this.productionRepository.getProductionsByStatusByProductId(
      StatusProduction.HARVESTED,
      productId,
    );

    const validProductions = productions.filter(
      (p) => p.quantityHarvested > 0 && p.cost !== undefined && p.cost >= 0,
    );

    if (validProductions.length === 0) {
      throw new Error(`No valid harvested productions found for product with id ${productId}`);
    }

    const totalCost = validProductions.reduce((sum, p) => sum + p.cost, 0);
    const totalHarvested = validProductions.reduce((sum, p) => sum + p.quantityHarvested, 0);

    if (totalHarvested === 0) {
      throw new Error('Total harvested quantity is zero. Cannot calculate cost per kg.');
    }

    const costPerKg = totalCost / totalHarvested;

    return {
      productId,
      productName: '',
      totalCost,
      totalHarvested,
      costPerKg,
      productionCount: validProductions.length,
    };
  }
}
