import { Request } from 'express';

import { SaleRepositoryFirebase } from '@/infra/firebase/SaleRepositoryFirebase';
import { ListSaleUseCase } from '@/usercases/sale/ListSaleUseCase';
import { UpdateSaleUseCase } from '@/usercases/sale/UpdateSaleUseCase';
import { CreateSaleUseCase } from '@/usercases/sale/CreateSaleUseCase';
import { ShowSaleUseCase } from '@/usercases/sale/ShowSaleUseCase';
import { RemoveSaleUseCase } from '@/usercases/sale/RemoveSaleUseCase';
import { verifyProductExists } from '@/interfaces/http/controllers/ProductController';
import { Sale } from '@/domain/entities/Sale';


const saleRepo = new SaleRepositoryFirebase();
const listSaleUseCase = new ListSaleUseCase(saleRepo);
const createSaleUseCase = new CreateSaleUseCase(saleRepo);
const removeSaleUseCase = new RemoveSaleUseCase(saleRepo);
const showSaleUseCase = new ShowSaleUseCase(saleRepo);
const updateSaleUseCase = new UpdateSaleUseCase(saleRepo);

const listSales = async () => {
  return await listSaleUseCase.execute();
};

const createSale = async (req: Request) => {
  const sale: Sale = req.body;
  if (!sale.productId) {
    throw new Error('Product ID is required for creating a sale');
  }
  sale.saleDate = sale.saleDate || new Date().toISOString();
  await verifyProductExists(sale.productId);

  return await createSaleUseCase.execute(sale);
};

const showSale = async (req: Request) => {
  const id = req.params.id;
  return await showSaleUseCase.execute(id);
};

const updateSale = async (req: Request) => {
  const saleId = req.params.id;
  const sale: Sale = req.body;
  const existingSale = await showSaleUseCase.execute(saleId);

  if (!existingSale) {
    throw new Error(`Sale with id ${saleId} not found`);
  }

  await verifyProductExists(sale.productId);
  const newSale = { ...existingSale, ...sale };
  return await updateSaleUseCase.execute(newSale);
};

const removeSale = async (req: Request) => {
  const id = req.params.id;
  return await removeSaleUseCase.execute(id);
};

export const verifySaleExists = async (id: string) => {
  const sale = await showSaleUseCase.execute(id);
  if (!sale) {
    throw new Error(`Sale with id ${id} not found`);
  }
  return sale.uid;
};

const SaleController = {
  listSales,
  createSale,
  showSale,
  updateSale,
  removeSale,
};

export default SaleController;
