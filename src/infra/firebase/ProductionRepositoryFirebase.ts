import admin from './FirebaseAdmin';
import { ProductionRepository } from '@/domain/repositories/ProductionRepository';
import { Production } from '@/domain/entities/Production';

export class ProductionRepositoryFirebase implements ProductionRepository {
  async listProductions(): Promise<Production[]> {
    const snapshot = await admin.firestore().collection('productions').get();
    return snapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    })) as Production[];
  }

  async getProductionById(id: string): Promise<Production | null> {
    const doc = await admin.firestore().collection('productions').doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return { ...doc.data(), uid: doc.id } as Production;
  }

  async createProduction(production: Production): Promise<Production> {
    const docRef = await admin
      .firestore()
      .collection('productions')
      .add(production);
    return { ...production, uid: docRef.id };
  }

  async updateProduction(production: Production): Promise<Production> {
    if (!production.uid)
      throw new Error('Production id is required for update');
    const docRef = admin
      .firestore()
      .collection('productions')
      .doc(production.uid);
    await docRef.set(production, { merge: true });
    return production;
  }

  async deleteProduction(uid: string): Promise<void> {
    if (!uid) throw new Error('Production id is required for update');
    await admin.firestore().collection('productions').doc(uid).delete();
  }
}
