import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength
} from "class-validator";

export class UserUpdateDto {
  @IsOptional()
  @IsString()
  _operatorId?: string;

  @IsOptional()
  @IsString()
  @IsPhoneNumber('UZ')
  phone?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  password?: string;

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

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
