import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {environment} from "../../../../../../../apps/backend/src/environments/environment";
import {UserAuthJwtPayloadDto} from "@mobile-control-gateway/backend/users/backend/class-transfer-objects";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environment.authenticationConfig.SECRET
    });
  }

  async validate(payload: UserAuthJwtPayloadDto) {
    return {
      userId: payload.userId, accessLevel: payload.accessLevel, refreshToken: payload.refreshToken
    }
  }
}
