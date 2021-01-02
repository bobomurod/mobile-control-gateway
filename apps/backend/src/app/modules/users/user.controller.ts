import {Body, Controller, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {UserService} from './user.service';
import {UserDto, UserUpdateDto} from "@mobile-control-gateway/backend/users/backend/class-transfer-objects";
import {JwtAuthGuard} from "@mobile-control-gateway/backend/authentication/services";
import {UserActivationService} from "@mobile-control-gateway/backend/users/services";
import {UserCodeDto} from "@mobile-control-gateway/backend/users/backend/class-transfer-objects";

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService, private readonly _userActivationService: UserActivationService) {
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<UserDto> {
    return this._userService.getSingle({_id: id});
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
    return this._userService.updateSingle(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('guarded/2')
  guarded() {
    return 'secured'
  }

  @UseGuards(JwtAuthGuard)
  @Post('activate/:id')
  async sendActivationCode(@Param('id') id: string): Promise<any> {
    return await this._userActivationService.performActivationCode(id)
    // return `code sendedd ${id}`
  }

  @UseGuards(JwtAuthGuard)
  @Post('activate')
  async checkActivationCode(@Body() activationData: UserCodeDto): Promise<any> {
    return this._userActivationService.checkActivationCode(activationData)
  }
}
