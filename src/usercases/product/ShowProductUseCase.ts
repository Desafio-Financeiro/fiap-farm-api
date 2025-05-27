import { ProductRepository } from '@/domain/repositories/ProductRepository';
import { Product } from '@/domain/entities/Product';

export class ShowProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: Product['uid']) {
    return this.productRepository.getProductById(id);
  }
}
