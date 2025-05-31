import admin from './FirebaseAdmin';
import { SaleRepository } from '@/domain/repositories/SaleRepository';
import { Sale } from '@/domain/entities/Sale';

export class SaleRepositoryFirebase implements SaleRepository {
  async listSales(): Promise<Sale[]> {
    const snapshot = await admin.firestore().collection('sales').get();
    return snapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    })) as Sale[];
  }

  async getSaleById(id: string): Promise<Sale | null> {
    const doc = await admin.firestore().collection('sales').doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return { ...doc.data(), uid: doc.id } as Sale;
  }

  async createSale(sale: Sale): Promise<Sale> {
    const docRef = await admin.firestore().collection('sales').add(sale);
    return { ...sale, uid: docRef.id };
  }

  async updateSale(sale: Sale): Promise<Sale> {
    if (!sale.uid) throw new Error('Sale id is required for update');
    const docRef = admin.firestore().collection('sales').doc(sale.uid);
    await docRef.set(sale, { merge: true });
    return sale;
  }

  async deleteSale(uid: string): Promise<void> {
    if (!uid) throw new Error('Sale id is required for update');
    await admin.firestore().collection('sales').doc(uid).delete();
  }
}
