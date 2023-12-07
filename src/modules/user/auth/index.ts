import { JwtStrategy } from './jwt.strategy';
import { Provider } from '@nestjs/common';
import { LocalStrategy } from './local.strategy';

export const strategies: Provider[] = [LocalStrategy, JwtStrategy];