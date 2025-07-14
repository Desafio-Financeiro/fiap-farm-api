import admin from './FirebaseAdmin';
import { ProductRepositoryFirebase } from './ProductRepositoryFirebase';
import { InventoryMovementRepositoryFirebase } from './InventoryMovementRepositoryFirebase';

import { SaleRepository } from '@/domain/repositories/SaleRepository';
import { Sale } from '@/domain/entities/Sale';
import {
  SourceInventoryMovement,
  TypeInventoryMovement,
  InventoryMovement,
} from '@/domain/entities/InventoryMovement';

export class SaleRepositoryFirebase implements SaleRepository {
  async getAll(): Promise<Sale[]> {
    const productRepo = new ProductRepositoryFirebase();
    const snapshot = await admin.firestore().collection('sales').get();
    return await Promise.all(
      snapshot.docs.map(async (doc) => {
        const saleData = doc.data();
        const product = await productRepo.getById(saleData.productId);
        return {
          ...saleData,
          uid: doc.id,
          product: product!,
        } as Sale;
      }),
    );
  }

  async getSaleById(id: string): Promise<Sale | null> {
    const productRepo = new ProductRepositoryFirebase();
    const doc = await admin.firestore().collection('sales').doc(id).get();
    if (!doc.exists) {
      return null;
    }
    const saleData = doc.data();
    const product = await productRepo.getById(saleData?.productId);
    return { ...saleData, uid: doc.id, product: product! } as Sale;
  }

  async createSale(sale: Sale): Promise<Sale> {
    const totalPrice = sale.unitPrice * sale.quantity;
    const saleToSave = { ...sale, totalPrice };
    const docRef = await admin.firestore().collection('sales').add(saleToSave);
    return { ...saleToSave, uid: docRef.id };
  }

  async updateSale(sale: Sale): Promise<Sale> {
    if (!sale.uid) throw new Error('Sale id is required for update');
    const totalPrice = sale.unitPrice * sale.quantity;
    const saleToUpdate = { ...sale, totalPrice };
    const docRef = admin.firestore().collection('sales').doc(sale.uid);

    const prevDoc = await docRef.get();
    const prevStatus = prevDoc.data()?.status;

    await docRef.set(saleToUpdate, { merge: true });

    const inventoryRepo = new InventoryMovementRepositoryFirebase();
    const movementQuery = await admin
      .firestore()
      .collection('inventoryMovements')
      .where('referenceId', '==', sale.uid)
      .where('source', '==', SourceInventoryMovement.SALE)
      .get();
    const movementDoc = movementQuery.empty ? null : movementQuery.docs[0];

    if (sale.status === 'COMPLETED' && movementQuery.empty) {
      const movement: InventoryMovement = {
        productId: sale.productId,
        type: TypeInventoryMovement.EXIT,
        quantity: sale.quantity,
        source: SourceInventoryMovement.SALE,
        referenceId: sale.uid,
        product: sale.product,
        createdAt: new Date(),
      };
      await inventoryRepo.createInventoryMovement(movement);
    }

    if (prevStatus === 'COMPLETED' && sale.status !== 'COMPLETED' && movementDoc) {
      await inventoryRepo.deleteInventoryMovement(movementDoc.id);
    }
    return saleToUpdate;
  }

  async deleteSale(uid: string): Promise<void> {
    if (!uid) throw new Error('Sale id is required for update');
    await admin.firestore().collection('sales').doc(uid).delete();
  }

  async getSalesByProductId(productId: string): Promise<Sale[]> {
    const snapshot = await admin
      .firestore()
      .collection('sales')
      .where('productId', '==', productId)
      .get();
    return snapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    })) as Sale[];
  }
}
