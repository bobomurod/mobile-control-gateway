import {Body, Controller, Get, Param, Patch} from '@nestjs/common';
import {UserService} from './user.service';
import {UserDto, UserUpdateDto} from "@mobile-control-gateway/backend/users/backend/class-transfer-objects";

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
}
