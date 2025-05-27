import { ProductRepository } from '@/domain/repositories/ProductRepository';
import { Product } from '@/domain/entities/Product';

export class UpdateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(product: Product) {
    return this.productRepository.updateProduct(product);
  }
}
