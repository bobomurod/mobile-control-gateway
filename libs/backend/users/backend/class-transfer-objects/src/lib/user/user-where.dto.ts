import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength
} from "class-validator";
import {UserAccessLevelEnum} from "@mobile-control-gateway/backend/users/backend/enums";

export class UserWhereDto {
  @IsOptional()
  @IsString()
  _id?: string;

  @IsOptional()
  @IsString()
  _operatorId?: string;

  @IsOptional()
  @IsString()
  @IsPhoneNumber('UZ')
  phone?: string;

  @IsOptional()
  @IsEnum(UserAccessLevelEnum)
  accessLevel?: UserAccessLevelEnum;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(64)
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNumber()
  @MinLength(4)
  @MaxLength(10)
  approveCode?: number;

  @IsOptional()
  @IsBoolean()
  isApproved?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
