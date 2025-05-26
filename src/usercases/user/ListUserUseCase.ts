import { UserRepository } from '@/domain/repositories/UserRepository';

export class ListUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute() {
    return this.userRepository.listUsers();
  }
}
