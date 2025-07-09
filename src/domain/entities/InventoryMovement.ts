import { Product } from './Product';

export interface InventoryMovement {
  uid?: string;
  productId: string;
  type: TypeInventoryMovement;
  quantity: number;
  source: SourceInventoryMovement;
  referenceId: string;
  createdAt?: Date;
  product: Product;
}

export enum SourceInventoryMovement {
  SALE = 'SALE',
  PRODUCTION = 'PRODUCTION',
}
export enum TypeInventoryMovement {
  ENTRY = 'ENTRY',
  EXIT = 'EXIT',
}

