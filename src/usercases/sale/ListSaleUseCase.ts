import { SaleRepository } from '@/domain/repositories/SaleRepository';

export class ListSaleUseCase {
  constructor(private saleRepository: SaleRepository) {}

  async execute() {
    return this.saleRepository.getAll();
  }
}
