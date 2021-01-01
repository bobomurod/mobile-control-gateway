import {Injectable, InternalServerErrorException, Logger, NotFoundException,} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {
  UserCreateDto,
  UserDto,
  UserUpdateDto, UserWhereDto
} from "@mobile-control-gateway/backend/users/backend/class-transfer-objects";
import {UserCollection} from "@mobile-control-gateway/backend/users/backend/schemas";

@Injectable()
export class UserService {
  private readonly _logger: Logger = new Logger('userService')
  constructor(
    @InjectModel(UserCollection.name)
    private readonly _userModel: Model<UserCollection>,
  ) {}

  async createSingle(data: UserCreateDto): Promise<UserDto> {
    this._logger.log(data)
    const _insertObject = new this._userModel(data);
    return await _insertObject
      .save()
      .then((user) => user.toObject())
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });
  }
  async updateSingle(userId: string, data: UserUpdateDto): Promise<UserDto> {
    await this._userModel
      .findById(userId)
      .exec()
      .then((user) => {
        if (!user) {
          throw new NotFoundException();
        }
      })
      .catch((error) => {
        if (error instanceof NotFoundException) {
          throw new NotFoundException('User for update not found');
        }
        throw new InternalServerErrorException();
      });
    return await this._userModel
      .findByIdAndUpdate(userId, data, { new: true })
      .exec()
      .then((user) => user.toObject())
      .catch(() => {
        throw new InternalServerErrorException();
      });
  }
  async getSingle(where: UserWhereDto): Promise<UserDto> {
    this._logger.log(where)
    return await this._userModel
      .findOne(where)
      .exec()
      .then((user) => {
        if (!user) {
          throw new NotFoundException();
        }
        return user.toObject();
      })
      .catch((error) => {
        if (error instanceof NotFoundException) {
          throw new NotFoundException('User for update not found');
        }
        throw new InternalServerErrorException();
      });
  }
  async getMany(where: UserWhereDto): Promise<UserDto[]> {
    return await this._userModel
      .find(where)
      .exec()
      .then((users) => {
        if (!users.length) {
          throw new NotFoundException();
        }
        return users.map((user) => user.toObject());
      })
      .catch((error) => {
        if (error instanceof NotFoundException) {
          throw new NotFoundException('Users not found');
        }
        throw new InternalServerErrorException();
      });
  }
  async deleteSingle(where: UserWhereDto): Promise<UserDto> {
    return await this._userModel
      .findOneAndRemove(where)
      .exec()
      .then((user) => {
        if (!user) {
          throw new NotFoundException();
        }
        return user.toObject();
      })
      .catch((error) => {
        if (error instanceof NotFoundException) {
          throw new NotFoundException('User for delete not found');
        }
        throw new InternalServerErrorException();
      });
  }

}
