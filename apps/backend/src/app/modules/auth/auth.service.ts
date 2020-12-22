import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../users/user.service';

import { ConfigService } from '@nestjs/config';
import {AuthenticationSecurityService} from "@mobile-control-gateway/backend/authentication/services";
import {
  UserAuthJwtPayloadDto,
  UserAuthJwtResponseDto,
  UserAuthLoginDto, UserAuthRegistrationDto, UserDto
} from "@mobile-control-gateway/backend/users/backend/class-transfer-objects";

@Injectable()
export class AuthService {
  private readonly _logger: Logger = new Logger('authService');
  private readonly _accessTokenTTL: number;
  private readonly _refreshTokenTTL: number;

  constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
    private readonly _authenticationSecurityService: AuthenticationSecurityService,
    private readonly _configService: ConfigService,
  ) {
    this._accessTokenTTL = this._configService.get('ACCESS_TOKEN_TTL');
    this._refreshTokenTTL = this._configService.get('REFRESH_TOKEN_TTL');
  }

  async login(data: UserAuthLoginDto): Promise<UserAuthJwtResponseDto> {
    const _userWhere = data;
    delete _userWhere.password;
    const _user: UserDto = await this._userService
      .getSingle(_userWhere)
      .then((user) => user)
      .catch(() => {
        throw new UnauthorizedException('Invalid username or password');
      });
    return this._authenticationSecurityService
      .checkPassword(data.password, _user.password)
      .then((checkStatus) => {
        if (!checkStatus) {
          throw new UnauthorizedException();
        }
        const payload: UserAuthJwtPayloadDto = {
          userId: _user._id,
          accessLevel: _user.accessLevel,
        };
        return {
          ...payload,
          ...{ userId: _user._id,accessToken: this._jwtService.sign(payload), accessLevel: _user.accessLevel },
        };
      })
      .catch((error) => {
        if (error instanceof UnauthorizedException) {
          this._logger.warn('Received request which is bad password');
          throw new UnauthorizedException('Invalid username or password');
        }
        this._logger.error(error);
        throw new InternalServerErrorException();
      });
  }

  async registration(data: UserAuthRegistrationDto): Promise<UserAuthJwtResponseDto> {
    data.password = await this._authenticationSecurityService.encrypt(data.password);
    return await this._userService
      .createSingle(data)
      .then((user) => {
        const payload: UserAuthJwtPayloadDto = {
          userId: user._id,
          accessLevel: user.accessLevel
        };
        return {
          ...payload,
          ...{ accessToken: this._jwtService.sign(payload) },
        };
      })
      .catch(() => {
        throw new UnauthorizedException(
          'Unable to registration, please try later again or check data ',
        );
      });
  }

  /**
   * @description Generating JWT response object,
   * using passed "payload" parameter like a source data.
   * @param payload
   * @return UserAuthJwtResponse
   * @private
   */
  private async _generateJwtResponse(
    payload: UserdebiaJwtPayloadDto,
  ): Promise<UserJwtResponseDto> {
    return {
      accessToken: await this._jwtService.signAsync(
        { ...payload, ...{ tokenType: 'accessToken' } },
        { expiresIn: this._accessTokenTTL },
      ),
      refreshToken: await this._jwtService.signAsync(
        { ...payload, ...{ tokenType: 'refreshToken' } },
        { expiresIn: this._refreshTokenTTL },
      ),
      user: {
        _id: payload._id,
        email: payload.email,
        accessLevel: payload.accessLevel,
      },
    };
  }

  async validateUser(login: string, pass: string): Promise<any> {
    // const user = await this._userService.findOne(login);
    // if (user && user.password === pass) {
    //   const { password, ...result } = user;
    //   return result;
    // }
    return true;
  }
}
