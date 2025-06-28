import { AverageCycleRequest, AverageCycleResponse } from '@/interfaces/http/dtos/MetricsDTO';
import { ProductionRepository } from '@/domain/repositories/ProductionRepository';
import { StatusProduction } from '@/domain/entities/Production';

export class AverageCycleUseCase {
  constructor(private productionRepository: ProductionRepository) {}

  async execute({ productId }: AverageCycleRequest): Promise<AverageCycleResponse> {
    const productions = await this.productionRepository.getProductionsByStatusByProductId(
      StatusProduction.HARVESTED,
      productId,
    );

    if (productions.length === 0) {
      throw new Error(`No productions found for product with id ${productId}`);
    }

    const diffBetweenDates = (start: Date, end: Date): number => {
      const startDate = new Date(start);
      const endDate = new Date(end);
      return Math.abs(endDate.getTime() - startDate.getTime());
    };

    const totalCycle = productions.reduce((sum, production) => {
      if (production.plantingDate && production.harvestDate) {
        return sum + diffBetweenDates(production.plantingDate, production.harvestDate);
      }
      return sum;
    }, 0);

    return {
      productId,
      productName: '',
      averageCycle: totalCycle / productions.length / (1000 * 60 * 60 * 24),
      productionCount: productions.length,
    };
  }
}
