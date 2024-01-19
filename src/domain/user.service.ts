import { User } from './user.entity';
import { CreateUserDto } from '../presentations/dto/create-user.dto';

export interface IUserService {
  create(createUserDto: CreateUserDto): Promise<User>;
  findAll(): Promise<User[]>;
  findOne(cpf: string): Promise<User | null>;
}
