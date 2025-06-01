import admin from './FirebaseAdmin';
import { GoalRepository } from '@/domain/repositories/GoalRepository';
import { Goal } from '@/domain/entities/Goal';

export class GoalRepositoryFirebase implements GoalRepository {
  async listGoals(): Promise<Goal[]> {
    const snapshot = await admin.firestore().collection('goals').get();
    return snapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    })) as Goal[];
  }

  async getGoalById(id: string): Promise<Goal | null> {
    const doc = await admin.firestore().collection('goals').doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return { ...doc.data(), uid: doc.id } as Goal;
  }

  async createGoal(goal: Goal): Promise<Goal> {
    const docRef = await admin.firestore().collection('goals').add(goal);
    return { ...goal, uid: docRef.id };
  }

  async updateGoal(goal: Goal): Promise<Goal> {
    if (!goal.uid) throw new Error('Goal id is required for update');
    const docRef = admin.firestore().collection('goals').doc(goal.uid);
    await docRef.set(goal, { merge: true });
    return goal;
  }

  async deleteGoal(uid: string): Promise<void> {
    if (!uid) throw new Error('Goal id is required for update');
    await admin.firestore().collection('goals').doc(uid).delete();
  }
}
