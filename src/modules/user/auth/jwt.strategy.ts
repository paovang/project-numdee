import { AuthService } from './service/auth.service';
import { IEnv } from '@/common/interfaces/env.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _config: ConfigService<IEnv>,
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _config.get('JWT_SECRET'),
    });
  }

  async validate(payload: any): Promise<any> {
    const user = await this.authService.findOne(payload.sub);
    
    return user;
  }
}