import { FindAllUsersUseCase } from './find-all-users.use-case';
import { IUserRepository } from '../../domain/user.repository';
import { User } from '../../domain/user.entity';

describe('FindAllUsersUseCase', () => {
  let userRepositoryMock: jest.Mocked<IUserRepository>;
  let findAllUsersUseCase: FindAllUsersUseCase;

  beforeEach(() => {
    userRepositoryMock = {
      findAll: jest.fn().mockResolvedValue([
        new User('mockedCpf1', 'mockedName1', 'mockedEmail1'),
        new User('mockedCpf2', 'mockedName2', 'mockedEmail2'),
        // Adicione mais usuários conforme necessário
      ]),
    } as unknown as jest.Mocked<IUserRepository>;

    findAllUsersUseCase = new FindAllUsersUseCase(userRepositoryMock);
  });

  it('should return a list of users', async () => {
    // When
    const userList: User[] = await findAllUsersUseCase.execute();

    // Then
    expect(userRepositoryMock.findAll).toHaveBeenCalledTimes(1);
    expect(userList).toBeDefined();
    expect(userList).toBeInstanceOf(Array);
    expect(userList).toHaveLength(2); // Ajuste conforme o número de usuários mockados
    expect(userList[0]).toBeInstanceOf(User);
    expect(userList[0].cpf).toBe('mockedCpf1');
    expect(userList[0].name).toBe('mockedName1');
    expect(userList[0].email).toBe('mockedEmail1');
    // Repita para outros usuários conforme necessário
  });
});
