import { FindOneUserUseCase } from './find-one-user.use-case';
import { IUserRepository } from '../../domain/user.repository';
import { User } from '../../domain/user.entity';

describe('FindOneUserUseCase', () => {
  let userRepositoryMock: jest.Mocked<IUserRepository>;
  let findOneUserUseCase: FindOneUserUseCase;

  beforeEach(() => {
    userRepositoryMock = {
      findByPk: jest
        .fn()
        .mockResolvedValue(new User('mockedCpf', 'mockedName', 'mockedEmail')),
    } as unknown as jest.Mocked<IUserRepository>;

    findOneUserUseCase = new FindOneUserUseCase(userRepositoryMock);
  });

  it('should return a user when found', async () => {
    // Given
    const cpfToFind = 'mockedCpf';

    // When
    const foundUser: User = await findOneUserUseCase.execute(cpfToFind);

    // Then
    expect(userRepositoryMock.findByPk).toHaveBeenCalledWith(cpfToFind);
    expect(foundUser).toBeDefined();
    expect(foundUser).toBeInstanceOf(User);
    expect(foundUser.cpf).toBe('mockedCpf');
    expect(foundUser.name).toBe('mockedName');
    expect(foundUser.email).toBe('mockedEmail');
  });

  it('should throw an error when user is not found', async () => {
    // Given
    const nonExistentCpf = 'nonExistentCpf';
    userRepositoryMock.findByPk.mockResolvedValue(null);

    // When
    const execute = async () =>
      await findOneUserUseCase.execute(nonExistentCpf);

    // Then
    await expect(execute()).rejects.toThrowError('Usuario não encontrado');
    expect(userRepositoryMock.findByPk).toHaveBeenCalledWith(nonExistentCpf);
  });
});
