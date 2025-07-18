import { Request } from 'express';

import { ProductRepositoryFirebase } from '@/infra/firebase/ProductRepositoryFirebase';
import { ListProductUseCase } from '@/usercases/product/ListProductUseCase';
import { UpdateProductUseCase } from '@/usercases/product/UpdateProductUseCase';
import { CreateProductUseCase } from '@/usercases/product/CreateProductUseCase';
import { ShowProductUseCase } from '@/usercases/product/ShowProductUseCase';
import { RemoveProductUseCase } from '@/usercases/product/RemoveProductUseCase';
import { Product } from '@/domain/entities/Product';

const productRepo = new ProductRepositoryFirebase();
const listProductUseCase = new ListProductUseCase(productRepo);
const createProductUseCase = new CreateProductUseCase(productRepo);
const removeProductUseCase = new RemoveProductUseCase(productRepo);
const showProductUseCase = new ShowProductUseCase(productRepo);
const updateProductUseCase = new UpdateProductUseCase(productRepo);

const listProducts = async () => {
  return await listProductUseCase.execute();
};

const createProduct = async (req: Request) => {
  const product: Product = req.body;
  return await createProductUseCase.execute(product);
};

const showProduct = async (req: Request) => {
  const id = req.params.id;
  return await showProductUseCase.execute(id);
};

const updateProduct = async (req: Request) => {
  const productId = req.params.id;
  const product: Product = req.body;
  product.uid = productId;
  return await updateProductUseCase.execute(product);
};

const removeProduct = async (req: Request) => {
  const id = req.params.id;
  return await removeProductUseCase.execute(id);
};

export const verifyProductExists = async (id: Product['uid']) => {
  const product = await showProductUseCase.execute(id);

  if (!product) {
    throw new Error(`Product with id ${id} not found`);
  }
};

const ProductController = {
  listProducts,
  createProduct,
  showProduct,
  updateProduct,
  removeProduct,
};

export default ProductController;
