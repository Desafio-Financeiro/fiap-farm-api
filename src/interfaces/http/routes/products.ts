import { Router } from 'express';

import ProductController from '@/interfaces/http/controllers/ProductController';

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de produtos
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Produto criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *
 * /products/{id}:
 *   get:
 *     summary: Busca um produto pelo ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *   put:
 *     summary: Atualiza um produto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Produto atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *   delete:
 *     summary: Remove um produto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto removido
 */

const productRouter = Router();

productRouter.get('/', async (req, res, next) => {
  try {
    const products = await ProductController.listProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

productRouter.post('/', async (req, res, next) => {
  try {
    const product = await ProductController.createProduct(req);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

productRouter.get('/:id', async (req, res, next) => {
  try {
    const product = await ProductController.showProduct(req);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

productRouter.put('/:id', async (req, res, next) => {
  try {
    const product = await ProductController.updateProduct(req);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

productRouter.delete('/:id', async (req, res, next) => {
  try {
    await ProductController.removeProduct(req);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

export default productRouter;
