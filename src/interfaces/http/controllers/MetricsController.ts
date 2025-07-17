import { Request } from 'express';

import { ProductRepositoryFirebase } from '@/infra/firebase/ProductRepositoryFirebase';
import { ShowProductUseCase } from '@/usercases/product/ShowProductUseCase';
import { Product } from '@/domain/entities/Product';
import { YieldPerHectareUseCase } from '@/usercases/metrics/YieldPerHectareUseCase';
import {
  AverageCycleResponse,
  BestYieldProductResponse,
  CostPerKgResponse,
  FastestProductsResponse,
  LossRateResponse,
  MostProducedProductResponse,
  NetProfitResponse,
  TopSoldProductsResponse,
  TotalSalesResponse,
  YieldPerHectareResponse,
} from '@/interfaces/http/dtos/MetricsDTO';
import { ProductionRepositoryFirebase } from '@/infra/firebase/ProductionRepositoryFirebase';
import { AverageCycleUseCase } from '@/usercases/metrics/AverageCycleUseCase';
import { NetProfitUseCase } from '@/usercases/metrics/NetProfitUseCase';
import { SaleRepositoryFirebase } from '@/infra/firebase/SaleRepositoryFirebase';
import { LossRateUseCase } from '@/usercases/metrics/LossRateUseCase';
import { CostPerKgUseCase } from '@/usercases/metrics/CostPerKgUseCase';
import { BestYieldProductUseCase } from '@/usercases/metrics/BestYieldProductUseCase';
import { TopSoldProductsUseCase } from '@/usercases/metrics/TopSoldProductsUseCase';
import { FastestProductsUseCase } from '@/usercases/metrics/FastestProductUseCase';
import { MostProducedProductUseCase } from '@/usercases/metrics/MostProducedProductUseCase';
import { TotalSalesUseCase } from '@/usercases/metrics/TotalSalesUseCase';

const productRepo = new ProductRepositoryFirebase();
const productionRepo = new ProductionRepositoryFirebase();
const saleRepo = new SaleRepositoryFirebase();
const showProductUseCase = new ShowProductUseCase(productRepo);
const yieldPerHectareUseCase = new YieldPerHectareUseCase(productionRepo);
const averageCycleUseCase = new AverageCycleUseCase(productionRepo);
const lossRateUseCase = new LossRateUseCase(productionRepo);
const costPerKgUseCase = new CostPerKgUseCase(productionRepo);
const bestYieldProductUseCase = new BestYieldProductUseCase(productionRepo);
const netProfitUseCase = new NetProfitUseCase(productionRepo, saleRepo);
const topSoldProductsUseCase = new TopSoldProductsUseCase(saleRepo, productRepo);
const fastestProductsUseCase = new FastestProductsUseCase(productRepo);
const mostProducedProductUseCase = new MostProducedProductUseCase(productionRepo, productRepo);
const totalSalesUseCase = new TotalSalesUseCase(saleRepo, productRepo);

const getYieldPerHectare = async (req: Request): Promise<YieldPerHectareResponse> => {
  const productId = req.query.productId as string | undefined;

  if (!productId) throw new Error('productId is required');
  const product = await verifyProductExists(productId);
  const yieldPerHectare = await yieldPerHectareUseCase.execute({
    productId: product.uid as string,
  });
  return {
    ...yieldPerHectare,
    productName: product.name,
  };
};

const getAverageCycle = async (req: Request): Promise<AverageCycleResponse> => {
  const productId = req.query.productId as string | undefined;

  if (!productId) throw new Error('productId is required');
  const product = await verifyProductExists(productId);
  const averageCycle = await averageCycleUseCase.execute({
    productId: product.uid as string,
  });
  return {
    ...averageCycle,
    productName: product.name,
  };
};

const getNetProfit = async (req: Request): Promise<NetProfitResponse> => {
  const productId = req.query.productId as string | undefined;

  if (!productId) throw new Error('productId is required');
  const product = await verifyProductExists(productId);
  const netProfit = await netProfitUseCase.execute({
    productId: product.uid as string,
  });
  return {
    ...netProfit,
    productName: product.name,
  };
};

const getLossRate = async (req: Request): Promise<LossRateResponse> => {
  const productId = req.query.productId as string | undefined;

  if (!productId) throw new Error('productId is required');
  const product = await verifyProductExists(productId);
  const lossRate = await lossRateUseCase.execute({
    productId: product.uid as string,
  });
  return {
    ...lossRate,
    productName: product.name,
  };
};

const getCostPerKg = async (req: Request): Promise<CostPerKgResponse> => {
  const productId = req.query.productId as string | undefined;

  if (!productId) throw new Error('productId is required');
  const product = await verifyProductExists(productId);
  const netProfit = await costPerKgUseCase.execute({
    productId: product.uid as string,
  });
  return {
    ...netProfit,
    productName: product.name,
  };
};

const getBestYieldProduct = async (): Promise<BestYieldProductResponse> => {
  const bestYieldProduct = await bestYieldProductUseCase.execute();

  const product = bestYieldProduct.productId
    ? await verifyProductExists(bestYieldProduct.productId)
    : {
        uid: '',
        name: 'Unknown Product',
        averageProductionDays: 0,
      };
  return {
    ...bestYieldProduct,
    productName: product.name,
  };
};

const getTopSoldProducts = async (): Promise<TopSoldProductsResponse> => {
  return await topSoldProductsUseCase.execute();
};

const getFastestProducts = async (): Promise<FastestProductsResponse> => {
  return await fastestProductsUseCase.execute();
};

const getMostProducedProduct = async (): Promise<MostProducedProductResponse> => {
  return await mostProducedProductUseCase.execute();
};

const getTotalSales = async (): Promise<TotalSalesResponse> => {
  return await totalSalesUseCase.execute();
};

export const verifyProductExists = async (id: Product['uid']) => {
  const product = await showProductUseCase.execute(id);

  if (!product) {
    throw new Error(`Product with id ${id} not found`);
  }
  return product;
};

const MetricsController = {
  getYieldPerHectare,
  getAverageCycle,
  getNetProfit,
  getLossRate,
  getCostPerKg,
  getBestYieldProduct,
  getTopSoldProducts,
  getFastestProducts,
  getMostProducedProduct,
  getTotalSales,
};

export default MetricsController;
