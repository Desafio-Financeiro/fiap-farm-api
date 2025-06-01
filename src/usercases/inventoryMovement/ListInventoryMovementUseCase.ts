import { InventoryMovementRepository } from '@/domain/repositories/InventoryMovementRepository';

export class ListInventoryMovementUseCase {
  constructor(
    private inventoryMovementRepository: InventoryMovementRepository,
  ) {}

  async execute() {
    return this.inventoryMovementRepository.listInventoryMovements();
  }
}
