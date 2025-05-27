import admin from './FirebaseAdmin';
import { ProductRepository } from '@/domain/repositories/ProductRepository';
import { Product } from '@/domain/entities/Product';

export class ProductRepositoryFirebase implements ProductRepository {
  async listProducts(): Promise<Product[]> {
    const snapshot = await admin.firestore().collection('products').get();
    return snapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    })) as Product[];
  }

  async getProductById(id: string): Promise<Product | null> {
    const doc = await admin.firestore().collection('products').doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return { ...doc.data(), uid: doc.id } as Product;
  }

  async createProduct(product: Product): Promise<Product> {
    const docRef = await admin.firestore().collection('products').add(product);
    return { ...product, uid: docRef.id };
  }

  async updateProduct(product: Product): Promise<Product> {
    if (!product.uid) throw new Error('Product id is required for update');
    const docRef = admin.firestore().collection('products').doc(product.uid);
    await docRef.set(product, { merge: true });
    return product;
  }

  async deleteProduct(uid: string): Promise<void> {
    if (!uid) throw new Error('Product id is required for update');
    await admin.firestore().collection('products').doc(uid).delete();
  }
}
