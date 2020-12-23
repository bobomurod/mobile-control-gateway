import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ConfigModule} from '@nestjs/config';
import {UserModule} from './modules/users/user.module';
import {AuthModule} from './modules/auth/auth.module';
import {environment} from "../environments/environment";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${environment.databaseConfig.USER}:${environment.databaseConfig.PASSWORD}@${environment.databaseConfig.HOST}/${environment.databaseConfig.NAME}?${environment.databaseConfig.OPTION}`,
    ),

    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
