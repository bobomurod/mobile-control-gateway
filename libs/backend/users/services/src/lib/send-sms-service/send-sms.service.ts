export class SendSmsService {
    sendActivationCode(code: number) {
      //generate sms text with code and post it to queue
    }

    private _performMessage(code: number) {
      return `Vash secretny kod ${code}.`;
    }
}
