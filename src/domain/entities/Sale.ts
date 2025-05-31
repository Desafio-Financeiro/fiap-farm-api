export interface Sale {
  uid?: string;
  productId: string;
  quantity: number;
  totalPrice: number;
  saleDate: Date;
  userId: string;
  unitPrice: number;
  createdAt?: Date;
  status?: SaleStatus;
}

export enum SaleStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
  FAILED = 'FAILED',
}
