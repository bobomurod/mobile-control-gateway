import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {
  UserAuthJwtResponseDto,
  UserAuthLoginDto, UserAuthRegistrationDto
} from "@mobile-control-gateway/backend/users/backend/class-transfer-objects";

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {
  }

  @Post('login')
  async login(@Body() body: UserAuthLoginDto): Promise<UserAuthJwtResponseDto> {
    return this._authService.login(body);
    // return true;
  }

  @Post('registration')
  async registration(@Body() body: UserAuthRegistrationDto): Promise<UserAuthJwtResponseDto> {
    return this._authService.registration(body);
  }
}
