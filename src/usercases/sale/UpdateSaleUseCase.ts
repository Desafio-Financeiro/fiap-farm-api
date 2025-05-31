import { SaleRepository } from '@/domain/repositories/SaleRepository';
import { Sale } from '@/domain/entities/Sale';

export class UpdateSaleUseCase {
  constructor(private saleRepository: SaleRepository) {}

  async execute(sale: Sale) {
    return this.saleRepository.updateSale(sale);
  }
}
