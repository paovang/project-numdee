import { UserModel } from './../data-typeorm/models/user.model';
import { CommandBus } from '@nestjs/cqrs';
import { UserLoginCommand } from './../commands/command/user/login.command';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './service/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _commandBus: CommandBus
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    return await this._commandBus.execute<UserLoginCommand, UserModel>(
      new UserLoginCommand(username, password)
    );
  }
}