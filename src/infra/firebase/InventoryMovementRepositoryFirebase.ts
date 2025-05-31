import admin from './FirebaseAdmin';
import { InventoryMovementRepository } from '@/domain/repositories/InventoryMovementRepository';
import { InventoryMovement } from '@/domain/entities/InventoryMovement';

export class InventoryMovementRepositoryFirebase
  implements InventoryMovementRepository
{
  async listInventoryMovements(): Promise<InventoryMovement[]> {
    const snapshot = await admin
      .firestore()
      .collection('inventoryMovements')
      .get();
    return snapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    })) as InventoryMovement[];
  }

  async getInventoryMovementById(
    id: string,
  ): Promise<InventoryMovement | null> {
    const doc = await admin
      .firestore()
      .collection('inventoryMovements')
      .doc(id)
      .get();
    if (!doc.exists) {
      return null;
    }
    return { ...doc.data(), uid: doc.id } as InventoryMovement;
  }

  async createInventoryMovement(
    inventoryMovement: InventoryMovement,
  ): Promise<InventoryMovement> {
    const docRef = await admin
      .firestore()
      .collection('inventoryMovements')
      .add(inventoryMovement);
    return { ...inventoryMovement, uid: docRef.id };
  }

  async updateInventoryMovement(
    inventoryMovement: InventoryMovement,
  ): Promise<InventoryMovement> {
    if (!inventoryMovement.uid)
      throw new Error('InventoryMovement id is required for update');
    const docRef = admin
      .firestore()
      .collection('inventoryMovements')
      .doc(inventoryMovement.uid);
    await docRef.set(inventoryMovement, { merge: true });
    return inventoryMovement;
  }

  async deleteInventoryMovement(uid: string): Promise<void> {
    if (!uid) throw new Error('InventoryMovement id is required for update');
    await admin.firestore().collection('inventoryMovements').doc(uid).delete();
  }
}
