import { InventoryMovementRepository } from '@/domain/repositories/InventoryMovementRepository';
import { InventoryMovement } from '@/domain/entities/InventoryMovement';

export class RemoveInventoryMovementUseCase {
  constructor(
    private inventoryMovementRepository: InventoryMovementRepository,
  ) {}

  async execute(id: InventoryMovement['uid']) {
    return this.inventoryMovementRepository.deleteInventoryMovement(id);
  }
}
