import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf
} from "class-validator";

export class UserAuthLoginDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  password: string;

  @IsOptional()
  @ValidateIf(data=>!data.username && !data.email)
  @IsString()
  @IsPhoneNumber('UZ')
  phone?: string;

  @IsOptional()
  @ValidateIf(data=>!data.phone && !data.email)
  @IsString()
  @MinLength(6)
  @MaxLength(64)
  username?: string;

  @IsOptional()
  @ValidateIf(data=>!data.username && !data.phone)
  @IsEmail()
  email?: string;
}
