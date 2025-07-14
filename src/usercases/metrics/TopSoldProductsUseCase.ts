import { SaleRepository } from '@/domain/repositories/SaleRepository';
import { ProductRepository } from '@/domain/repositories/ProductRepository';

interface TopSoldProduct {
  productId: string;
  productName: string;
  totalSold: number;
  totalRevenue: number;
}

interface TopSoldProductsResponse {
  topProducts: TopSoldProduct[];
}

export class TopSoldProductsUseCase {
  constructor(
    private saleRepository: SaleRepository,
    private productRepository: ProductRepository,
  ) {}

  async execute(): Promise<TopSoldProductsResponse> {
    const sales = await this.saleRepository.getAll();

    const salesByProduct = new Map<string, { totalSold: number; totalRevenue: number }>();

    for (const sale of sales) {
      const existing = salesByProduct.get(sale.productId) || { totalSold: 0, totalRevenue: 0 };
      existing.totalSold += sale.quantity;
      existing.totalRevenue += sale.totalPrice;
      salesByProduct.set(sale.productId, existing);
    }

    const sorted = Array.from(salesByProduct.entries())
      .sort((a, b) => b[1].totalSold - a[1].totalSold)
      .slice(0, 5);

    const result: TopSoldProduct[] = [];

    for (const [productId, { totalSold, totalRevenue }] of sorted) {
      const product = await this.productRepository.getById(productId);
      result.push({
        productId,
        productName: product?.name || '',
        totalSold,
        totalRevenue,
      });
    }

    return { topProducts: result };
  }
}
