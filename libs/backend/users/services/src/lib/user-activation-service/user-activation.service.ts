import {UserService} from "../../../../../../../apps/backend/src/app/modules/users/user.service";
import {UserDto, UserWhereDto} from "@mobile-control-gateway/backend/users/backend/class-transfer-objects";
import {UserCodeDto} from "@mobile-control-gateway/backend/users/backend/class-transfer-objects";
import {SendSmsService} from "../send-sms-service/send-sms.service";
import {Injectable, Logger} from "@nestjs/common";

@Injectable()
export class UserActivationService {
  private readonly _logger: Logger = new Logger('userActivationService')

  constructor(
    private readonly _userService: UserService,
    private readonly _sendSmsService: SendSmsService
  ) {
  }
  async performActivationCode(id): Promise<any> {
    /*
    1. Generate the code
    2. Save code to use document in db
    3. Return the code
     */
    const activationCode:number = this._getRandomNumberBetween(1000, 9999);
    try {
      await this._userService.updateSingle(id, {approveCode: activationCode});
      await this._sendSmsService.sendActivationCode(activationCode)
    } catch (e) {
      return 'error'+e
    }
    return activationCode
  }

  async checkActivationCode(activationData: UserCodeDto): Promise<boolean> {
    const userFromDb = await this._userService.getSingle({_id: activationData._id})
    this._logger.log(userFromDb)
    if (userFromDb.approveCode === activationData.activationCode)
    {
      await this._activate(userFromDb._id)
      return true
    }
    return false
  }

  private async _activate(userId: string): Promise<UserDto> {
    const data: UserWhereDto = {}
    data.isActive = true
    return await this._userService.updateSingle(userId, data);
  }

  private _getRandomNumberBetween(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
  }
}
