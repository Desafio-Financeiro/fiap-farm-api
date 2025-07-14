export interface YieldPerHectareRequest {
  productId: string;
}

export interface YieldPerHectareResponse {
  productId: string;
  productName: string;
  totalHarvested: number;
  totalArea: number;
  yieldPerHectare: number;
  productionCount: number;
}

export interface AverageCycleRequest {
  productId: string;
}

export interface AverageCycleResponse {
  productId: string;
  productName: string;
  averageCycle: number;
  productionCount: number;
}

export interface NetProfitRequest {
  productId: string;
}

export interface NetProfitResponse {
  productId: string;
  productName: string;
  totalRevenue: number;
  totalCost: number;
  netProfit: number;
  salesCount: number;
  productionCount: number;
}

export interface LossRateRequest {
  productId: string;
}

export interface LossRateResponse {
  productId: string;
  productName: string;
  averageLossRate: number;
  productionCount: number;
}

export interface CostPerKgRequest {
  productId: string;
}

export interface CostPerKgResponse {
  productId: string;
  productName: string;
  totalCost: number;
  totalHarvested: number;
  costPerKg: number;
  productionCount: number;
}

export interface BestYieldProductResponse {
  productId: string;
  productName: string;
  yieldPerHectare: number;
  totalHarvested: number;
  totalArea: number;
  productionCount: number;
}

export interface TopSoldProductsResponse {
  topProducts: {
    productId: string;
    productName: string;
    totalSold: number;
    totalRevenue: number;
  }[];
}

export interface FastestProduct {
  productId: string;
  productName: string;
  averageProductionDays: number;
}

export interface FastestProductsResponse {
  fastestProducts: FastestProduct[];
}

export interface MostProducedProductResponse {
  productId: string;
  productName: string;
  totalHarvested: number;
}

export interface TotalSalesProduct {
  productId: string;
  productName: string;
  totalRevenue: number;
  totalQuantity: number;
  salesCount: number;
}

export interface TotalSalesResponse {
  products: TotalSalesProduct[];
}
