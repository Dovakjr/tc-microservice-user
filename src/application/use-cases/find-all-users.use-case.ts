import { IUserRepository } from '../../domain/user.repository'; // Importe a interface do repositório
import { User } from '../../domain/user.entity'; // Importe a entidade do usuário

export class FindAllUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<User[]> {
    const userList = this.userRepository.findAll();
    return userList;
  }
}
