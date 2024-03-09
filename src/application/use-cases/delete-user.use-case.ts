import { IUserRepository } from '../../domain/user.repository'; // Importe a interface do repositório
import { User } from '../../domain/user.entity'; // Importe a entidade do usuário

export class DeleteUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: any): Promise<User> {
    const user = this.userRepository.findByPk(id);
    await this.userRepository.delete(id);
    return user;
  }
}
