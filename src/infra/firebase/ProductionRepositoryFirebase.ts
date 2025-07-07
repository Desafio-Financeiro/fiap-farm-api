import admin from './FirebaseAdmin';
import { ProductRepositoryFirebase } from './ProductRepositoryFirebase';
import { InventoryMovementRepositoryFirebase } from './InventoryMovementRepositoryFirebase';

import { ProductionRepository } from '@/domain/repositories/ProductionRepository';
import { Production } from '@/domain/entities/Production';
import { Product } from '@/domain/entities/Product';
import {
  SourceInventoryMovement,
  TypeInventoryMovement,
  InventoryMovement,
} from '@/domain/entities/InventoryMovement';

export class ProductionRepositoryFirebase implements ProductionRepository {
  async listProductions(): Promise<Production[]> {
    const productRepo = new ProductRepositoryFirebase();
    const snapshot = await admin.firestore().collection('productions').get();

    return await Promise.all(
      snapshot.docs.map(async (doc) => {
        const productionData = doc.data();
        const product = await productRepo.getProductById(productionData.productId);
        return {
          ...productionData,
          uid: doc.id,
          product: product!, // força não nulo, pois Production exige product
        } as Production;
      }),
    );
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

    if (production.status === 'HARVESTED') {
      const inventoryRepo = new InventoryMovementRepositoryFirebase();
      const existingMovements = await admin
        .firestore()
        .collection('inventoryMovements')
        .where('referenceId', '==', production.uid)
        .where('source', '==', SourceInventoryMovement.PRODUCTION)
        .get();
      if (existingMovements.empty) {
        const movement: InventoryMovement = {
          productId: production.productId,
          type: TypeInventoryMovement.ENTRY,
          quantity: production.quantityHarvested,
          source: SourceInventoryMovement.PRODUCTION,
          referenceId: production.uid,
          createdAt: new Date(),
        };
        await inventoryRepo.createInventoryMovement(movement);
      }
    }
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
