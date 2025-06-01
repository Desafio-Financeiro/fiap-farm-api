import { InventoryMovementRepository } from '@/domain/repositories/InventoryMovementRepository';
import { InventoryMovement } from '@/domain/entities/InventoryMovement';

export class UpdateInventoryMovementUseCase {
  constructor(
    private inventoryMovementRepository: InventoryMovementRepository,
  ) {}

  async execute(inventoryMovement: InventoryMovement) {
    return this.inventoryMovementRepository.updateInventoryMovement(
      inventoryMovement,
    );
  }
}
