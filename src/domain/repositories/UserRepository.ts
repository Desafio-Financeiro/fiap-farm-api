import { User } from '@/domain/entities/User';

export interface UserRepository {
  listUsers(): Promise<User[]>;
}
