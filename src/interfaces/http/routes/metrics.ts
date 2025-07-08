import { Router, Request, Response } from 'express';

import MetricsController from '@/interfaces/http/controllers/MetricsController';

const metricsRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Metrics
 *   description: Indicadores e métricas agrícolas
 */

/**
 * @swagger
 * /metrics/yield-per-hectare:
 *   get:
 *     summary: Calcula a produtividade média (kg/ha) de um produto
 *     tags: [Metrics]
 *     parameters:
 *       - in: query
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto a ser analisado
 *     responses:
 *       200:
 *         description: Produtividade calculada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 productId:
 *                   type: string
 *                 productName:
 *                   type: string
 *                 totalHarvested:
 *                   type: number
 *                   description: Total colhido em kg
 *                 totalArea:
 *                   type: number
 *                   description: Área total em hectares
 *                 yieldPerHectare:
 *                   type: number
 *                   description: Rendimento médio (kg/ha)
 *                 productionCount:
 *                   type: number
 *                   description: Número de produções consideradas
 */

metricsRouter.get('/yield-per-hectare', async (req: Request, res: Response, next) => {
  try {
    const product = await MetricsController.getYieldPerHectare(req);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /metrics/average-cycle:
 *   get:
 *     summary: Calcula o ciclo médio de produção de um produto (em dias)
 *     tags: [Metrics]
 *     parameters:
 *       - in: query
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto a ser analisado
 *     responses:
 *       200:
 *         description: Ciclo médio de produção calculado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 productId:
 *                   type: string
 *                 productName:
 *                   type: string
 *                 averageCycle:
 *                   type: number
 *                   description: Média de dias entre plantio e colheita
 *                 productionCount:
 *                   type: number
 *                   description: Número de produções consideradas
 */
metricsRouter.get('/average-cycle', async (req: Request, res: Response, next) => {
  try {
    const product = await MetricsController.getAverageCycle(req);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /metrics/net-profit:
 *   get:
 *     summary: Calcula o lucro líquido de uma cultura (produto)
 *     tags: [Metrics]
 *     parameters:
 *       - in: query
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto (cultura) a ser analisado
 *     responses:
 *       200:
 *         description: Lucro líquido da cultura calculado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 productId:
 *                   type: string
 *                   example: "milho-123"
 *                 productName:
 *                   type: string
 *                   example: "Milho"
 *                 totalRevenue:
 *                   type: number
 *                   example: 15000
 *                   description: Receita total com vendas (R$)
 *                 totalCost:
 *                   type: number
 *                   example: 9800
 *                   description: Custo total das produções (R$)
 *                 netProfit:
 *                   type: number
 *                   example: 5200
 *                   description: Lucro líquido (receita - custo)
 *                 salesCount:
 *                   type: number
 *                   example: 6
 *                   description: Número de vendas consideradas
 *                 productionCount:
 *                   type: number
 *                   example: 3
 *                   description: Número de produções consideradas
 */
metricsRouter.get('/net-profit', async (req: Request, res: Response, next) => {
  try {
    const product = await MetricsController.getNetProfit(req);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /metrics/loss-rate:
 *   get:
 *     summary: Calcula a taxa média de perda de um produto (cultura)
 *     tags: [Metrics]
 *     parameters:
 *       - in: query
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto (cultura) a ser analisado
 *     responses:
 *       200:
 *         description: Taxa de perda média calculada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 productId:
 *                   type: string
 *                   example: "milho-123"
 *                 productName:
 *                   type: string
 *                   example: "Milho"
 *                 averageLossRate:
 *                   type: number
 *                   example: 18.5
 *                   description: Taxa média de perda em porcentagem (%)
 *                 productionCount:
 *                   type: number
 *                   example: 4
 *                   description: Número de produções consideradas no cálculo
 */
metricsRouter.get('/loss-rate', async (req: Request, res: Response, next) => {
  try {
    const product = await MetricsController.getLossRate(req);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /metrics/cost-per-kg:
 *   get:
 *     summary: Calcula o custo por quilo produzido de um produto (cultura)
 *     tags: [Metrics]
 *     parameters:
 *       - in: query
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto (cultura) a ser analisado
 *     responses:
 *       200:
 *         description: Custo por quilo calculado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 productId:
 *                   type: string
 *                   example: "milho-123"
 *                 productName:
 *                   type: string
 *                   example: "Milho"
 *                 totalCost:
 *                   type: number
 *                   example: 2000
 *                   description: Custo total somado das produções colhidas (R$)
 *                 totalHarvested:
 *                   type: number
 *                   example: 1500
 *                   description: Quantidade total colhida (kg)
 *                 costPerKg:
 *                   type: number
 *                   example: 1.33
 *                   description: Custo médio por quilo produzido (R$/kg)
 *                 productionCount:
 *                   type: number
 *                   example: 3
 *                   description: Número de produções consideradas no cálculo
 */
metricsRouter.get('/cost-per-kg', async (req: Request, res: Response, next) => {
  try {
    const product = await MetricsController.getNetProfit(req);
    res.json(product);
  } catch (error) {
    next(error);
  }
});
/**
 * @swagger
 * /metrics/best-yield-product:
 *   get:
 *     summary: Retorna o produto com melhor rendimento médio por hectare
 *     tags: [Metrics]
 *     responses:
 *       200:
 *         description: Produto com maior rendimento encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 productId:
 *                   type: string
 *                   example: "soja-123"
 *                 productName:
 *                   type: string
 *                   example: "Soja"
 *                 yieldPerHectare:
 *                   type: number
 *                   example: 3200
 *                   description: Rendimento médio por hectare (kg/ha)
 *                 totalHarvested:
 *                   type: number
 *                   example: 9600
 *                   description: Soma total colhida do produto
 *                 totalArea:
 *                   type: number
 *                   example: 3
 *                   description: Soma da área plantada nas produções válidas
 *                 productionCount:
 *                   type: number
 *                   example: 4
 *                   description: Número de produções colhidas consideradas
 */
metricsRouter.get('/best-yield-product', async (_req: Request, res: Response, next) => {
  try {
    const product = await MetricsController.getBestYieldProduct();
    res.json(product);
  } catch (error) {
    next(error);
  }
});

export default metricsRouter;
