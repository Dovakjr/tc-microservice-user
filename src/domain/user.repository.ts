import { User } from './user.entity';
export interface IUserRepository {
  create(User: User): Promise<User>;
  findAll(): Promise<User[]>;
  findByPk(cpf: string): Promise<User>;
  delete(id: string): Promise<User>;
}
