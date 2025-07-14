import { ProductRepository } from '@/domain/repositories/ProductRepository';

export class ListProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute() {
    return this.productRepository.getAll();
  }
}
