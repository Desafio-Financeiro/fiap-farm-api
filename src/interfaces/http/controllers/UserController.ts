import { UserRepositoryFirebase } from '@/infra/firebase/UserRepositoryFirebase';
import { ListUsersUseCase } from '@/usercases/user/ListUserUseCase';

const userRepo = new UserRepositoryFirebase();
const listUsersUseCase = new ListUsersUseCase(userRepo);

const listUsers = async () => {
  return await listUsersUseCase.execute();
};

const UserController = {
  listUsers,
};

export default UserController;
