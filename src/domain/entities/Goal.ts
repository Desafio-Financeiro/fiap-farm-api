export interface Goal {
  uid?: string;
  productId: string;
  type: TypeGoal;
  quantityTarget: number;
  startDate: Date;
  endDate: Date;
  userId: string;
  createdAt?: Date;
}

export enum TypeGoal {
  SALE = 'SALE',
  PRODUCTION = 'PRODUCTION',
}
