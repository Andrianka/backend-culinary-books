import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserTransformer } from './transformers/user.transformer';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUserService = {
    findAll: jest.fn(),
    findByEmail: jest.fn(),
    getById: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    softDelete: jest.fn(),
    restoreUser: jest.fn(),
  };

  const mockUserTransformer = {
    transform: jest.fn(),
    transformAllUsers: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: mockUserService },
        { provide: UserTransformer, useValue: mockUserTransformer },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
