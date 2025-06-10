export interface InventoryMovement {
  uid?: string;
  productId: string;
  type: TypeInventoryMovement;
  quantity: number;
  source: SourceInventoryMovement;
  referenceId: string;
  createdAt?: Date;
}

export enum SourceInventoryMovement {
  SALE = 'SALE',
  PRODUCTION = 'PRODUCTION',
}
export enum TypeInventoryMovement {
  ENTRY = 'ENTRY',
  EXIT = 'EXIT',
}
