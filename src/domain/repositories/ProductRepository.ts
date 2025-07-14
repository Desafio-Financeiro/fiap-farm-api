import { Product } from '@/domain/entities/Product';

export interface ProductRepository {
  getAll(): Promise<Product[]>;

  getById(uid: Product['uid']): Promise<Product | null>;

  createProduct(product: Product): Promise<Product>;

  updateProduct(product: Product): Promise<Product>;

  deleteProduct(uid: Product['uid']): Promise<void>;
}
