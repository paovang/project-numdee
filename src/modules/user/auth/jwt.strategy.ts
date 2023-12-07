import { IEnv } from '@/common/interfaces/env.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _config: ConfigService<IEnv>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _config.get('JWT_SECRET'),
    });
  }

  async validate(payload: any): Promise<any> {
    delete payload.iat;
    delete payload.exp;
    
    return { userId: payload.sub, username: payload.username };
  }
}