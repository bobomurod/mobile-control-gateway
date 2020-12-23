import {IsEnum, IsNotEmpty, IsString} from "class-validator";
import {UserAccessLevelEnum} from "@mobile-control-gateway/backend/users/backend/enums";

export class UserAuthJwtPayloadDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsEnum(UserAccessLevelEnum)
  accessLevel: UserAccessLevelEnum;
}
