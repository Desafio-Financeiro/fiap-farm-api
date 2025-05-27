import { Product } from '@/domain/entities/Product';

export interface ProductRepository {
  listProducts(): Promise<Product[]>;

  getProductById(uid: Product['uid']): Promise<Product | null>;

  createProduct(product: Product): Promise<Product>;

  updateProduct(product: Product): Promise<Product>;

  deleteProduct(uid: Product['uid']): Promise<void>;
}
