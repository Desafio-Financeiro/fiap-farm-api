import { ProductRepository } from '@/domain/repositories/ProductRepository';
import { TotalSalesProduct, TotalSalesResponse } from '@/interfaces/http/dtos/MetricsDTO';
import { SaleRepository } from '@/domain/repositories/SaleRepository';

export class TotalSalesUseCase {
  constructor(
    private saleRepository: SaleRepository,
    private productRepository: ProductRepository,
  ) {}

  async execute(): Promise<TotalSalesResponse> {
    const sales = await this.saleRepository.getAll();
    const products = await this.productRepository.getAll();

    const grouped = new Map<
      string,
      { totalRevenue: number; totalQuantity: number; salesCount: number }
    >();
    let totalSoldValue = 0;

    for (const sale of sales) {
      const current = grouped.get(sale.productId) || {
        totalRevenue: 0,
        totalQuantity: 0,
        salesCount: 0,
      };
      const updated = {
        totalRevenue: current.totalRevenue + sale.totalPrice,
        totalQuantity: current.totalQuantity + sale.quantity,
        salesCount: current.salesCount + 1,
      };
      grouped.set(sale.productId, updated);
      totalSoldValue += sale.totalPrice;
    }

    const productsSummary: TotalSalesProduct[] = Array.from(grouped.entries()).map(
      ([productId, data]) => {
        const product = products.find((p) => p.uid === productId);
        return {
          productId,
          productName: product?.name || '',
          totalRevenue: data.totalRevenue,
          totalQuantity: data.totalQuantity,
          salesCount: data.salesCount,
        };
      },
    );

    return {
      products: productsSummary,
      totalSoldValue,
    };
  }
}
