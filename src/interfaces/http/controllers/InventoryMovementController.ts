import { InventoryMovementRepositoryFirebase } from '@/infra/firebase/InventoryMovementRepositoryFirebase';
import { ListInventoryMovementUseCase } from '@/usercases/inventoryMovement/ListInventoryMovementUseCase';
import { UpdateInventoryMovementUseCase } from '@/usercases/inventoryMovement/UpdateInventoryMovementUseCase';
import { CreateInventoryMovementUseCase } from '@/usercases/inventoryMovement/CreateInventoryMovementUseCase';
import { ShowInventoryMovementUseCase } from '@/usercases/inventoryMovement/ShowInventoryMovementUseCase';
import { RemoveInventoryMovementUseCase } from '@/usercases/inventoryMovement/RemoveInventoryMovementUseCase';
import { verifyProductExists } from '@/interfaces/http/controllers/ProductController';
import {
  InventoryMovement,
  SourceInventoryMovement,
} from '@/domain/entities/InventoryMovement';
import { Request } from 'express';
import { verifySaleExists } from '@/interfaces/http/controllers/SaleController';
import { verifyProductionExists } from '@/interfaces/http/controllers/ProductionController';

const inventoryMovementRepo = new InventoryMovementRepositoryFirebase();
const listInventoryMovementUseCase = new ListInventoryMovementUseCase(
  inventoryMovementRepo,
);
const createInventoryMovementUseCase = new CreateInventoryMovementUseCase(
  inventoryMovementRepo,
);
const removeInventoryMovementUseCase = new RemoveInventoryMovementUseCase(
  inventoryMovementRepo,
);
const showInventoryMovementUseCase = new ShowInventoryMovementUseCase(
  inventoryMovementRepo,
);
const updateInventoryMovementUseCase = new UpdateInventoryMovementUseCase(
  inventoryMovementRepo,
);

const listInventoryMovements = async () => {
  return await listInventoryMovementUseCase.execute();
};

const createInventoryMovement = async (req: Request) => {
  const inventoryMovement: InventoryMovement = req.body;
  if (!inventoryMovement.productId) {
    throw new Error('Product ID is required for creating a inventoryMovement');
  }
  await verifyProductExists(inventoryMovement.productId);
  await verifyInventoryMovementReferenceId(inventoryMovement);

  return await createInventoryMovementUseCase.execute(inventoryMovement);
};

const showInventoryMovement = async (req: Request) => {
  const id = req.params.id;
  return await showInventoryMovementUseCase.execute(id);
};

const updateInventoryMovement = async (req: Request) => {
  const inventoryMovementId = req.params.id;
  const inventoryMovement: InventoryMovement = req.body;
  const existingInventoryMovement =
    await showInventoryMovementUseCase.execute(inventoryMovementId);
  if (!existingInventoryMovement) {
    throw new Error(
      `InventoryMovement with id ${inventoryMovementId} not found`,
    );
  }

  await verifyProductExists(inventoryMovement.productId);
  await verifyInventoryMovementReferenceId(inventoryMovement);

  const newInventoryMovement = {
    ...existingInventoryMovement,
    ...inventoryMovement,
  };
  return await updateInventoryMovementUseCase.execute(newInventoryMovement);
};

const verifyInventoryMovementReferenceId = async (
  inventoryMovement: InventoryMovement,
) => {
  if (!inventoryMovement.referenceId) {
    throw new Error('Reference ID is required for inventory movement');
  }
  if (inventoryMovement.source === SourceInventoryMovement.SALE) {
    await verifySaleExists(inventoryMovement.referenceId);
  } else if (inventoryMovement.source === SourceInventoryMovement.PRODUCTION) {
    await verifyProductionExists(inventoryMovement.referenceId);
  } else {
    throw new Error(
      `Invalid source type: ${inventoryMovement.source}. Must be SALE or PRODUCTION.`,
    );
  }
};

const removeInventoryMovement = async (req: Request) => {
  const id = req.params.id;
  return await removeInventoryMovementUseCase.execute(id);
};

const InventoryMovementController = {
  listInventoryMovements,
  createInventoryMovement,
  showInventoryMovement,
  updateInventoryMovement,
  removeInventoryMovement,
};

export default InventoryMovementController;
