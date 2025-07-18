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
        const product = await productRepo.getById(productionData.productId);
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

    const prevDoc = await docRef.get();
    const prevStatus = prevDoc.data()?.status;

    await docRef.set(production, { merge: true });

    const inventoryRepo = new InventoryMovementRepositoryFirebase();
    const movementQuery = await admin
      .firestore()
      .collection('inventoryMovements')
      .where('referenceId', '==', production.uid)
      .where('source', '==', SourceInventoryMovement.PRODUCTION)
      .get();
    const movementDoc = movementQuery.empty ? null : movementQuery.docs[0];

    // Se mudou para HARVESTED e não existe movimento, cria
    if (production.status === 'HARVESTED' && movementQuery.empty) {
      const movement: InventoryMovement = {
        productId: production.productId,
        type: TypeInventoryMovement.ENTRY,
        quantity: production.quantityHarvested,
        source: SourceInventoryMovement.PRODUCTION,
        referenceId: production.uid,
        product: production.product,
        createdAt: new Date(),
      };
      await inventoryRepo.createInventoryMovement(movement);
    }

    if (prevStatus === 'HARVESTED' && production.status !== 'HARVESTED' && movementDoc) {
      await inventoryRepo.deleteInventoryMovement(movementDoc.id);
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
