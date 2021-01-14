import {Injectable, Logger} from "@nestjs/common";

@Injectable()
export class SendingQueueService {
  private readonly _logger: Logger = new Logger(('send sms queue'))
  async postMessage(message: string) {
    //queue message
    this._logger.log(message)
    return //true if message success queued
  }
}
