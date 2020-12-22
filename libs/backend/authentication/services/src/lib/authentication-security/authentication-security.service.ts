import { Injectable } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthenticationSecurityService {
  async encrypt(rawPassword: string): Promise<string> {
    return await bcryptjs.hash(rawPassword, 10);
  }

  async checkPassword(
    rawPassword: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    return await bcryptjs.compare(rawPassword, encryptedPassword);
  }

}
