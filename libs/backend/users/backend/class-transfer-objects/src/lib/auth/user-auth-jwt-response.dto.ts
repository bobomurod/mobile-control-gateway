import {IsEnum, IsNotEmpty, IsString} from "class-validator";
import {UserAccessLevelEnum} from "@mobile-control-gateway/backend/users/backend/enums";

export class UserAuthJwtResponseDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsEnum(UserAccessLevelEnum)
  accessLevel: UserAccessLevelEnum;

  @IsNotEmpty()
  @IsString()
  accessToken: string;

  // @IsNotEmpty()
  // @IsString()
  // refreshToken: string;
}
