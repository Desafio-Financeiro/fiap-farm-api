export interface Production {
  uid: string;
  productId: string;
  area: number;
  quantityExpected: number;
  quantityHarvested: number;
  status: StatusGoal;
  plantingDate: Date;
  harvestDate?: Date;
  userId: number;
  createdAt: Date;
}

export enum StatusGoal {
  WAITING = 'WAITING',
  IN_PROGRESS = 'IN_PROGRESS',
  HARVESTED = 'HARVESTED',
}
