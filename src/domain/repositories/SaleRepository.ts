import { Sale } from '@/domain/entities/Sale';

export interface SaleRepository {
  listSales(): Promise<Sale[]>;

  getSaleById(uid: Sale['uid']): Promise<Sale | null>;

  createSale(sale: Sale): Promise<Sale>;

  updateSale(sale: Sale): Promise<Sale>;

  deleteSale(uid: Sale['uid']): Promise<void>;
}
