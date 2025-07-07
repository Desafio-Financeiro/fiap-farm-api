import admin from './FirebaseAdmin';

import { ProductionRepository } from '@/domain/repositories/ProductionRepository';
import { Production } from '@/domain/entities/Production';
import { Product } from '@/domain/entities/Product';

export class ProductionRepositoryFirebase implements ProductionRepository {
  async listProductions(): Promise<any[]> {
    const snapshot = await admin.firestore().collection('productions').get();

    const productionsWithProducts = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const productionData = doc.data();
        const productId = productionData.productId;

        const productSnapshot = await admin
          .firestore()
          .collection('products')
          .where('uid', '==', productId)
          .limit(1)
          .get();

        let productData = null;
        if (!productSnapshot.empty) {
          productData = productSnapshot.docs[0].data();
        }

        return {
          uid: doc.id,
          ...productionData,
          product: productData,
        };
      }),
    );

    return productionsWithProducts;
  }

  async getProductionById(id: string): Promise<Production | null> {
    const doc = await admin.firestore().collection('productions').doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return { ...doc.data(), uid: doc.id } as Production;
  }

  async createProduction(production: Production): Promise<Production> {
    const docRef = await admin.firestore().collection('productions').add(production);
    return { ...production, uid: docRef.id };
  }

  async updateProduction(production: Production): Promise<Production> {
    if (!production.uid) throw new Error('Production id is required for update');
    const docRef = admin.firestore().collection('productions').doc(production.uid);
    await docRef.set(production, { merge: true });
    return production;
  }

  async getProductionsByProductId(productId: Product['uid']): Promise<Production[]> {
    const snapshot = await admin
      .firestore()
      .collection('productions')
      .where('productId', '==', productId)
      .get();
    return snapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    })) as Production[];
  }

  async getProductionsByStatusByProductId(
    status: Production['status'],
    productId: Product['uid'],
  ): Promise<Production[]> {
    const snapshot = await admin
      .firestore()
      .collection('productions')
      .where('status', '==', status)
      .where('productId', '==', productId)
      .get();
    return snapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    })) as Production[];
  }

  async deleteProduction(uid: string): Promise<void> {
    if (!uid) throw new Error('Production id is required for update');
    await admin.firestore().collection('productions').doc(uid).delete();
  }

  async getProductionsByStatus(status: Production['status']): Promise<Production[]> {
    const snapshot = await admin
      .firestore()
      .collection('productions')
      .where('status', '==', status)
      .get();
    return snapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    })) as Production[];
  }
}
