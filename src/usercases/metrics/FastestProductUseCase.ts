import { ProductRepository } from '@/domain/repositories/ProductRepository';
import { FastestProductsResponse } from '@/interfaces/http/dtos/MetricsDTO';

export class FastestProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(): Promise<FastestProductsResponse> {
    const products = await this.productRepository.getAll();

    const sorted = products
      .sort((a, b) => a.averageProductionDays - b.averageProductionDays)
      .slice(0, 5);

    const fastestProducts = sorted.map((product) => ({
      productId: product.uid!,
      productName: product.name,
      averageProductionDays: product.averageProductionDays,
    }));

    return { fastestProducts };
  }
}
