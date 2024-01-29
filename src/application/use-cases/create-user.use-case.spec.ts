import { CreateUserUseCase } from './create-user.use-case';
import { IUserRepository } from '../../domain/user.repository';
import { User } from '../../domain/user.entity';
import { CreateUserDto } from '../../presentations/dto/create-user.dto';

describe('CreateUserUseCase', () => {
  let userRepositoryMock: jest.Mocked<IUserRepository>;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    userRepositoryMock = {
      create: jest
        .fn()
        .mockResolvedValue(new User('mockedCpf', 'mockedName', 'mockedEmail')),
      findAll: jest.fn().mockResolvedValue([] as User[]),
      findByPk: jest
        .fn()
        .mockResolvedValue(new User('mockedCpf', 'mockedName', 'mockedEmail')),
    } as jest.Mocked<IUserRepository>;

    createUserUseCase = new CreateUserUseCase(userRepositoryMock);
  });

  it('should create a user successfully', async () => {
    // Given
    const userData: CreateUserDto = {
      cpf: '12345678900',
      name: 'John Doe',
      email: 'john@example.com',
    };

    // When
    await createUserUseCase.execute(userData);

    // Then
    expect(userRepositoryMock.create).toHaveBeenCalledWith(
      expect.objectContaining({
        cpf: '12345678900',
        name: 'John Doe',
        email: 'john@example.com',
      }),
    );
  });

  it('should return the created user', async () => {
    // Given
    const userData: CreateUserDto = {
      cpf: '12345678900',
      name: 'John Doe',
      email: 'john@example.com',
    };

    // When
    const createdUser: User = await createUserUseCase.execute(userData);

    // Then
    expect(createdUser).toBeDefined();
    expect(createdUser).toBeInstanceOf(User);
    expect(createdUser.cpf).toBe('mockedCpf'); // Ajuste conforme a lógica do seu aplicativo
    expect(createdUser.name).toBe('mockedName'); // Ajuste conforme a lógica do seu aplicativo
    expect(createdUser.email).toBe('mockedEmail'); // Ajuste conforme a lógica do seu aplicativo
  });
});
