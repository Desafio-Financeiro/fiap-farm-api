import { YieldPerHectareRequest, YieldPerHectareResponse } from '@/interfaces/http/dtos/MetricsDTO';
import { ProductionRepository } from '@/domain/repositories/ProductionRepository';

export class YieldPerHectareUseCase {
  constructor(private productionRepository: ProductionRepository) {}

  async execute({ productId }: YieldPerHectareRequest): Promise<YieldPerHectareResponse> {
    const productions = await this.productionRepository.getProductionsByProductId(productId);

    if (productions.length === 0) {
      return {
        productId,
        productName: '',
        totalHarvested: 0,
        totalArea: 0,
        yieldPerHectare: 0,
        productionCount: 0,
      };
    }
    const totalArea = productions.reduce((sum, production) => sum + (production.area || 0), 0);
    const totalQuantityHarvested = productions.reduce(
      (sum, production) => sum + (production.quantityHarvested || 0),
      0,
    );
    if (totalArea === 0) {
      throw new Error('Total area cannot be zero');
    }
    return {
      productId,
      productName: '',
      totalHarvested: totalQuantityHarvested,
      totalArea: totalArea,
      yieldPerHectare: totalQuantityHarvested / totalArea,
      productionCount: productions.length,
    };
  }
}
