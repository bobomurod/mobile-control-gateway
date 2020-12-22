import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationSecurityService } from './authentication-security.service';

describe('AuthEncryptService', () => {
  let service: AuthenticationSecurityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthenticationSecurityService],
    }).compile();

    service = module.get<AuthenticationSecurityService>(AuthenticationSecurityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
