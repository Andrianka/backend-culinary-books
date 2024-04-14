import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserRole } from './types';
import { UserRepository } from './users.repository';

describe('UsersService', () => {
  let service: UsersService;

  const mockUserRepository = {
    findAll: jest.fn(),
    findByEmail: jest.fn(),
    getById: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    softDelete: jest.fn(),
    restoreUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UserRepository, useValue: mockUserRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#create', () => {
    it('should create user with encoded password with default role USER', async () => {
      const user = {
        id: 'abc',
        email: 'test@email.com',
        password: 'encoded',
        role: UserRole.USER,
      };
      const data = {
        email: user.email,
        password: user.password,
      };

      mockUserRepository.createUser.mockReturnValue(user);

      const result = await service.createUser(data);

      expect(result).toEqual(user);
      expect(mockUserRepository.createUser).toHaveBeenCalledWith({
        ...data,
      });
    });
    it('should create user with encoded password with role MODERATOR', async () => {
      const user = {
        id: 'abc',
        email: 'test@email.com',
        password: 'encoded',
        role: UserRole.MODERATOR,
      };
      const data = {
        email: user.email,
        password: user.password,
        role: user.role,
      };

      mockUserRepository.createUser.mockReturnValue(user);

      const result = await service.createUser(data);

      expect(result).toEqual(user);
      expect(mockUserRepository.createUser).toHaveBeenCalledWith({
        ...data,
      });
    });
    it('should create user with encoded password with role ADMIN', async () => {
      const user = {
        id: 'abc',
        email: 'test@email.com',
        password: 'encoded',
        role: UserRole.ADMIN,
      };
      const data = {
        email: user.email,
        password: user.password,
        role: user.role,
      };

      mockUserRepository.createUser.mockReturnValue(user);

      const result = await service.createUser(data);

      expect(result).toEqual(user);
      expect(mockUserRepository.createUser).toHaveBeenCalledWith({
        ...data,
      });
    });
  });

  describe('#findAll', () => {
    it('should return all non deleted users', async () => {
      const user = {
        id: 'abc',
        email: 'test@email.com',
        password: 'encoded',
        role: UserRole.USER,
      };

      mockUserRepository.findAll.mockReturnValue(user);

      const result = await service.findAll();

      expect(result).toEqual(user);
      expect(mockUserRepository.findAll).toHaveBeenCalled();
    });
  });
  describe('#findByEmail', () => {
    it('should return user by email', async () => {
      const user = { email: 'test@email.com' };

      mockUserRepository.findByEmail.mockReturnValue(user);

      const result = await service.findByEmail(user.email);

      expect(result).toEqual(user);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(user.email);
    });
  });
  it('should reject if user not found', async () => {
    const user = { email: 'test@email.com' };

    mockUserRepository.findByEmail.mockRejectedValue({
      message: 'USER_NOT_FOUND',
      status: 404,
    });

    const result = service.findByEmail(user.email);

    await expect(result).rejects.toEqual(
      expect.objectContaining({
        message: 'USER_NOT_FOUND',
        status: 404,
      }),
    );
  });
});
