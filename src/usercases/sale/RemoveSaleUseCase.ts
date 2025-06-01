import { SaleRepository } from '@/domain/repositories/SaleRepository';
import { Sale } from '@/domain/entities/Sale';

export class RemoveSaleUseCase {
  constructor(private saleRepository: SaleRepository) {}

  async execute(id: Sale['uid']) {
    return this.saleRepository.deleteSale(id);
  }
}
