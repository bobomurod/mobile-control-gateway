import {UserService} from "../../../../../../../apps/backend/src/app/modules/users/user.service";
import {UserDto, UserWhereDto} from "@mobile-control-gateway/backend/users/backend/class-transfer-objects";


export class UserActivationService {
  constructor(
    private readonly _userService: UserService
  ) {
  }
  async generateActivationCode(): Promise<number> {
    /*
    1. Generate the code
    2. Save code to use document in db
    3. Return the code
     */
    return 333333
  }

  async checkActivationCode(userCode: number, user: UserWhereDto): Promise<boolean> {
    const userFromDb = await this._userService.getSingle(user)
    if (userFromDb.approveCode === userCode)
    {
      await this._activate(userFromDb._id)
      return true
    }
    return false
  }

  private async _activate(userId: string): Promise<UserDto> {
    let data: UserWhereDto
    data.isActive = true
    return await this._userService.updateSingle(userId, data);
  }
}
