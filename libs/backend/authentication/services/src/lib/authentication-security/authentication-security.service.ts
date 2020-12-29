// use 'strict';
import {Injectable, Logger} from '@nestjs/common';
import * as bcryptjs from 'bcrypt';
import {
  UserAuthJwtPayloadDto,
  UserAuthJwtResponseDto
} from "@mobile-control-gateway/backend/users/backend/class-transfer-objects";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {loadAdapter} from "@nestjs/core/helpers/load-adapter";

@Injectable()
export class AuthenticationSecurityService {
  private readonly _logger: Logger = new Logger('auth security service')
  private readonly _accessTokenTTL: number;
  private readonly _refreshTokenTTL: number;

  constructor(private readonly _jwtService: JwtService, private readonly _configService: ConfigService) {
    this._accessTokenTTL = this._configService.get('ACCESS_TOKEN_TTL');
    this._refreshTokenTTL = this._configService.get('REFRESH_TOKEN_TTL');
  }

  async encryptPassword(rawPassword: string): Promise<string> {
    return await bcryptjs.hash(rawPassword, 10);
  }

  async checkPassword(
    rawPassword: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    const result = await bcryptjs.compare(rawPassword, encryptedPassword)
    this._logger.log(result)
    return result
  }

  async generateJwtResponse(payload: UserAuthJwtPayloadDto): Promise<UserAuthJwtResponseDto> {
    return {
      userId: payload.userId,
      accessLevel: payload.accessLevel,
      accessToken: await this._jwtService.signAsync(
        {...payload, ...{tokenType: 'accessToken'}},
        {expiresIn: this._accessTokenTTL},
      ),
      // refreshToken: await this._jwtService.signAsync(
      //   { ...payload, ...{ tokenType: 'refreshToken' } },
      //   { expiresIn: this._refreshTokenTTL },
      // ),
    };
  }

}
