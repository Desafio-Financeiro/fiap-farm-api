import { NetProfitRequest, NetProfitResponse } from '@/interfaces/http/dtos/MetricsDTO';
import { ProductionRepository } from '@/domain/repositories/ProductionRepository';
import { StatusProduction } from '@/domain/entities/Production';
import { SaleRepository } from '@/domain/repositories/SaleRepository';

export class NetProfitUseCase {
  constructor(
    private productionRepository: ProductionRepository,
    private saleRepository: SaleRepository,
  ) {}

  async execute({ productId }: NetProfitRequest): Promise<NetProfitResponse> {
    const productions = await this.productionRepository.getProductionsByStatusByProductId(
      StatusProduction.HARVESTED,
      productId,
    );

    const sales = await this.saleRepository.getSalesByProductId(productId);

    if (sales.length === 0) {
      return {
        productId,
        productName: '',
        totalRevenue: 0,
        totalCost: 0,
        netProfit: 0,
        salesCount: 0,
        productionCount: productions.length,
      };
    }

    const totalRevenue = sales.reduce((acc, sale) => acc + sale.totalPrice, 0);
    const totalCost = productions.reduce((acc, production) => acc + production.cost, 0);

    const netProfit = totalRevenue - totalCost;

    return {
      productId,
      productName: '',
      totalRevenue,
      totalCost,
      netProfit,
      salesCount: sales.length,
      productionCount: productions.length,
    };
  }
}
