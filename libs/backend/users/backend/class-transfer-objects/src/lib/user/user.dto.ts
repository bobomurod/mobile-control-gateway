import {UserAccessLevelEnum} from "@mobile-control-gateway/backend/users/backend/enums";
import {
  IsBoolean,
  IsDateString, IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength
} from "class-validator";


export class UserDto {
  @IsNotEmpty()
  @IsString()
  _id: string;

  @IsOptional()
  @IsString()
  _operatorId: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('UZ')
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  password: string;

  @IsNotEmpty()
  @IsEnum(UserAccessLevelEnum)
  accessLevel: UserAccessLevelEnum;

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
  @IsDateString()
  lastLoginDate?: Date;

  @IsOptional()
  @IsBoolean()
  isApproved?: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  @IsNotEmpty()
  @IsDateString()
  createdAt: Date;

  @IsNotEmpty()
  @IsDateString()
  updatedAt: Date;
}
