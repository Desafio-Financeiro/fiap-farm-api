import { InventoryMovement } from '@/domain/entities/InventoryMovement';

export interface InventoryMovementRepository {
  listInventoryMovements(): Promise<InventoryMovement[]>;

  getInventoryMovementById(
    uid: InventoryMovement['uid'],
  ): Promise<InventoryMovement | null>;

  createInventoryMovement(
    inventoryMovement: InventoryMovement,
  ): Promise<InventoryMovement>;

  updateInventoryMovement(
    inventoryMovement: InventoryMovement,
  ): Promise<InventoryMovement>;

  deleteInventoryMovement(uid: InventoryMovement['uid']): Promise<void>;
}
