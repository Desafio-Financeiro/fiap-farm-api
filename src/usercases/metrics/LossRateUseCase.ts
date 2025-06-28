import { LossRateRequest, LossRateResponse } from '@/interfaces/http/dtos/MetricsDTO';
import { ProductionRepository } from '@/domain/repositories/ProductionRepository';
import { StatusProduction } from '@/domain/entities/Production';

export class LossRateUseCase {
  constructor(private productionRepository: ProductionRepository) {}

  async execute({ productId }: LossRateRequest): Promise<LossRateResponse> {
    const productions = await this.productionRepository.getProductionsByStatusByProductId(
      StatusProduction.HARVESTED,
      productId,
    );

    const validProductions = productions.filter((p) => p.quantityExpected > 0);

    if (validProductions.length === 0) {
      throw new Error(`No valid harvested productions found for product with id ${productId}`);
    }

    const lossRates = validProductions.map((p) => {
      const expected = p.quantityExpected;
      const harvested = p.quantityHarvested;
      const loss = Math.max(0, expected - harvested);
      return (loss / expected) * 100;
    });

    const averageLossRate = lossRates.reduce((sum, rate) => sum + rate, 0) / lossRates.length;

    return {
      productId,
      productionCount: validProductions.length,
      productName: '',
      averageLossRate,
    };
  }
}
