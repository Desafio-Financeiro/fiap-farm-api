import { InventoryMovementRepository } from '@/domain/repositories/InventoryMovementRepository';
import { InventoryMovement } from '@/domain/entities/InventoryMovement';

export class ShowInventoryMovementUseCase {
  constructor(
    private inventoryMovementRepository: InventoryMovementRepository,
  ) {}

  async execute(id: InventoryMovement['uid']) {
    return this.inventoryMovementRepository.getInventoryMovementById(id);
  }
}
