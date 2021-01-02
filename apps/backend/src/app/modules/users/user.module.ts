import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {UserCollection, UserSchema} from "@mobile-control-gateway/backend/users/backend/schemas";
import {UserActivationService} from "@mobile-control-gateway/backend/users/services";


@Module({
  imports: [MongooseModule.forFeature([
    { name: UserCollection.name, schema: UserSchema },
  ]),],
  controllers: [UserController],
  providers: [UserService, UserActivationService],
  exports: [UserService],
})
export class UserModule {}
