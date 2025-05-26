import admin from './FirebaseAdmin';
import { User } from '@/domain/entities/User';
import { UserRepository } from '@/domain/repositories/UserRepository';

export class UserRepositoryFirebase implements UserRepository {
  async listUsers(): Promise<User[]> {
    const result = await admin.auth().listUsers();
    return result.users.map((u) => ({
      uid: u.uid,
      email: u.email || '',
      name: u.displayName || undefined,
    }));
  }
}
