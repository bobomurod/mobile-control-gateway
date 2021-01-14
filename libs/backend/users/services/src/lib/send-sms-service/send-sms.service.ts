import {SendingQueueService} from "./sending-queue.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class SendSmsService {
    constructor(private readonly _sendingQueueService: SendingQueueService) {
    }
    async sendActivationCode(code: number) {
      await this._sendingQueueService.postMessage(this._performActivationMessage(code))
    }

    private _performActivationMessage(code: number) {
      return `Vash secretny kod ${code}.`;
    }
}
