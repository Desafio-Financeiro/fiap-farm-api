import { ProductionRepositoryFirebase } from '@/infra/firebase/ProductionRepositoryFirebase';
import { ListProductionUseCase } from '@/usercases/production/ListProductionUseCase';
import { UpdateProductionUseCase } from '@/usercases/production/UpdateProductionUseCase';
import { CreateProductionUseCase } from '@/usercases/production/CreateProductionUseCase';
import { ShowProductionUseCase } from '@/usercases/production/ShowProductionUseCase';
import { RemoveProductionUseCase } from '@/usercases/production/RemoveProductionUseCase';
import { verifyProductExists } from '@/interfaces/http/controllers/ProductController';
import { Production } from '@/domain/entities/Production';
import { Request } from 'express';

const productionRepo = new ProductionRepositoryFirebase();
const listProductionUseCase = new ListProductionUseCase(productionRepo);
const createProductionUseCase = new CreateProductionUseCase(productionRepo);
const removeProductionUseCase = new RemoveProductionUseCase(productionRepo);
const showProductionUseCase = new ShowProductionUseCase(productionRepo);
const updateProductionUseCase = new UpdateProductionUseCase(productionRepo);

const listProductions = async () => {
  return await listProductionUseCase.execute();
};

const createProduction = async (req: Request) => {
  const production: Production = req.body;
  if (!production.productId) {
    throw new Error('Product ID is required for creating a production');
  }

  await verifyProductExists(production.productId);

  return await createProductionUseCase.execute(production);
};

const showProduction = async (req: Request) => {
  const id = req.params.id;
  return await showProductionUseCase.execute(id);
};

const updateProduction = async (req: Request) => {
  const productionId = req.params.id;
  const production: Production = req.body;
  const existingProduction = await showProductionUseCase.execute(productionId);
  if (!existingProduction) {
    throw new Error(`Production with id ${productionId} not found`);
  }

  await verifyProductExists(production.productId);

  const newProduction = { ...existingProduction, ...production };
  return await updateProductionUseCase.execute(newProduction);
};

const removeProduction = async (req: Request) => {
  const id = req.params.id;
  return await removeProductionUseCase.execute(id);
};

export const verifyProductionExists = async (id: string) => {
  const production = await showProductionUseCase.execute(id);
  if (!production) {
    throw new Error(`Production with id ${id} not found`);
  }
  return production.uid;
};

const ProductionController = {
  listProductions,
  createProduction,
  showProduction,
  updateProduction,
  removeProduction,
};

export default ProductionController;
