import { SaleRepository } from '@/domain/repositories/SaleRepository';
import { ProductRepository } from '@/domain/repositories/ProductRepository';
import { TotalSalesProduct, TotalSalesResponse } from '@/interfaces/http/dtos/MetricsDTO';

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

    for (const sale of sales) {
      const current = grouped.get(sale.productId) || {
        totalRevenue: 0,
        totalQuantity: 0,
        salesCount: 0,
      };
      grouped.set(sale.productId, {
        totalRevenue: current.totalRevenue + sale.totalPrice,
        totalQuantity: current.totalQuantity + sale.quantity,
        salesCount: current.salesCount + 1,
      });
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

    return { products: productsSummary };
  }
}
