import { IUserRepository } from '../../domain/user.repository'; // Importe a interface do repositório
import { User } from '../../domain/user.entity'; // Importe a entidade do usuário
import { CreateUserDto } from '../../presentations/dto/create-user.dto';

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: CreateUserDto): Promise<User> {
    const user = new User(data.cpf, data.name, data.email);
    await this.userRepository.create(user);
    return user;
  }
}
