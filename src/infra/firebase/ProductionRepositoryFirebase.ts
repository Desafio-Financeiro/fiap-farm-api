import admin from './FirebaseAdmin';

import { ProductionRepository } from '@/domain/repositories/ProductionRepository';
import { Production } from '@/domain/entities/Production';
import { Product } from '@/domain/entities/Product';

export class ProductionRepositoryFirebase implements ProductionRepository {
  async listProductions(): Promise<Production[]> {
    const snapshot = await admin.firestore().collection('productions').get();

    const productions = snapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    })) as Production[];

    const productIds = [...new Set(productions.map((p) => p.productId))];

    const productSnapshots = await Promise.all(
      productIds.map((id) => admin.firestore().collection('products').doc(id).get()),
    );

    const productMap = new Map<string, Product>();

    productSnapshots.forEach((snap) => {
      if (snap.exists) {
        productMap.set(snap.id, { uid: snap.id, ...snap.data() } as Product);
      }
    });

    return productions.map((production) => ({
      ...production,
      product: productMap.get(production.productId),
    }));
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
