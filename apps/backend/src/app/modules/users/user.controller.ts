import {Body, Controller, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {UserService} from './user.service';
import {UserDto, UserUpdateDto} from "@mobile-control-gateway/backend/users/backend/class-transfer-objects";
import {JwtAuthGuard} from "@mobile-control-gateway/backend/authentication/services";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<UserDto> {
    return;
  }

  @Get()
  getAllUsers(): Promise<UserDto[]> {
    return;
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() body: UserUpdateDto,
  ): Promise<UserDto> {
    return this.userService.updateSingle(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('guarded/2')
  guarded() {
    return 'secured'
  }
  @Get('activate')
  async sendActivationCode(activationCode: number): Promise<string> {
    return 'code sendedd'
  }

  @Post('activate')
  async checkActivationCode(activationCode: number): Promise<string> {
    return 'code checked'
  }
}
