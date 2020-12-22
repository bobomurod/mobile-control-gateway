import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {AuthService} from './auth.service';
import {PassportModule} from '@nestjs/passport';
import {LocalStrategy} from './local.strategy';
import {AuthController} from './auth.controller';
import {JwtModule} from '@nestjs/jwt';
import {UserModule} from '../users/user.module';
import {AuthenticationSecurityService} from "@mobile-control-gateway/backend/authentication/services";

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET,
    }),
  ],
  providers: [AuthService, LocalStrategy, AuthenticationSecurityService],
  controllers: [AuthController],
})
export class AuthModule {}
