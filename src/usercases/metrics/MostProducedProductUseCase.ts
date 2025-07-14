import { ProductionRepository } from '@/domain/repositories/ProductionRepository';
import { ProductRepository } from '@/domain/repositories/ProductRepository';
import { StatusProduction } from '@/domain/entities/Production';
import { MostProducedProductResponse } from '@/interfaces/http/dtos/MetricsDTO';

export class MostProducedProductUseCase {
  constructor(
    private productionRepository: ProductionRepository,
    private productRepository: ProductRepository,
  ) {}

  async execute(): Promise<MostProducedProductResponse> {
    const productions = await this.productionRepository.getProductionsByStatus(
      StatusProduction.HARVESTED,
    );

    if (!productions.length) {
      throw new Error('No harvested productions found');
    }

    const harvestByProduct = new Map<string, number>();

    for (const production of productions) {
      const current = harvestByProduct.get(production.productId) || 0;
      harvestByProduct.set(production.productId, current + production.quantityHarvested);
    }

    const [productId, totalHarvested] = Array.from(harvestByProduct.entries()).sort(
      (a, b) => b[1] - a[1],
    )[0];

    const product = await this.productRepository.getById(productId);

    return {
      productId,
      productName: product?.name || '',
      totalHarvested,
    };
  }
}
