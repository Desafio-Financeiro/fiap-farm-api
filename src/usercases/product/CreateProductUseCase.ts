import { ProductRepository } from '@/domain/repositories/ProductRepository';
import { Product } from '@/domain/entities/Product';

export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(product: Product) {
    return this.productRepository.createProduct(product);
  }
}
