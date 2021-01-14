import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class UserCodeDto {
  @IsNotEmpty()
  @IsString()
  _id: string

  @IsNotEmpty()
  @IsNumber()
  activationCode: number
}
