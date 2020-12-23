import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength
} from "class-validator";

export class UserCreateDto {
  @IsOptional()
  @IsString()
  _operatorId?: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('UZ')
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  password: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(64)
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @IsBoolean()
  isActive?: boolean;
}
