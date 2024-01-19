import { IUserRepository } from '../../domain/user.repository'; // Importe a interface do repositório
import { User } from '../../domain/user.entity'; // Importe a entidade do usuário

export class FindOneUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(cpf: string): Promise<User> {
    const user = await this.userRepository.findByPk(cpf);
    if (!user) {
      throw new Error('Usuario não encontrado');
    }
    return user;
  }
}
