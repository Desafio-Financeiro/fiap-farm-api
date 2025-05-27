import { ProductRepository } from '@/domain/repositories/ProductRepository';
import { Product } from '@/domain/entities/Product';

export class RemoveProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: Product['uid']) {
    return this.productRepository.deleteProduct(id);
  }
}
