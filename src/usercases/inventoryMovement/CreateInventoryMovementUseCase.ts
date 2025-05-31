import { InventoryMovementRepository } from '@/domain/repositories/InventoryMovementRepository';
import { InventoryMovement } from '@/domain/entities/InventoryMovement';

export class CreateInventoryMovementUseCase {
  constructor(
    private inventoryMovementRepository: InventoryMovementRepository,
  ) {}

  async execute(inventoryMovement: InventoryMovement) {
    return this.inventoryMovementRepository.createInventoryMovement(
      inventoryMovement,
    );
  }
}
