import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {AuthService} from './auth.service';
import {PassportModule} from '@nestjs/passport';
import {AuthController} from './auth.controller';
import {JwtModule} from '@nestjs/jwt';
import {UserModule} from '../users/user.module';
import {AuthenticationSecurityService, JwtStrategy} from "@mobile-control-gateway/backend/authentication/services";
import {environment} from "../../../environments/environment";

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: environment.authenticationConfig.SECRET,
    }),
  ],
  providers: [AuthService, AuthenticationSecurityService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
