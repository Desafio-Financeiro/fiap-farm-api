import { BestYieldProductResponse } from '@/interfaces/http/dtos/MetricsDTO';
import { ProductionRepository } from '@/domain/repositories/ProductionRepository';
import { StatusProduction } from '@/domain/entities/Production';

interface ProductYieldData {
  productId: string;
  totalHarvested: number;
  totalArea: number;
  productionCount: number;
  yieldPerHectare: number;
}

export class BestYieldProductUseCase {
  constructor(private productionRepository: ProductionRepository) {}

  async execute(): Promise<BestYieldProductResponse> {
    const productions = await this.productionRepository.getProductionsByStatus(
      StatusProduction.HARVESTED,
    );

    const yieldMap = new Map<string, ProductYieldData>();

    for (const p of productions) {
      if (p.area <= 0 || p.quantityHarvested <= 0) continue;

      const existing = yieldMap.get(p.productId);

      if (!existing) {
        yieldMap.set(p.productId, {
          productId: p.productId,
          totalHarvested: p.quantityHarvested,
          totalArea: p.area,
          productionCount: 1,
          yieldPerHectare: 0,
        });
      } else {
        existing.totalHarvested += p.quantityHarvested;
        existing.totalArea += p.area;
        existing.productionCount += 1;
      }
    }

    const yieldList: ProductYieldData[] = [];

    for (const data of yieldMap.values()) {
      data.yieldPerHectare = data.totalHarvested / data.totalArea;
      yieldList.push(data);
    }

    if (yieldList.length === 0) {
      throw new Error('Nenhum produto com rendimento válido encontrado.');
    }

    const best = yieldList.reduce((a, b) => (a.yieldPerHectare > b.yieldPerHectare ? a : b));

    return {
      productId: best.productId,
      productName: '',
      yieldPerHectare: best.yieldPerHectare,
      totalHarvested: best.totalHarvested,
      totalArea: best.totalArea,
      productionCount: best.productionCount,
    };
  }
}
