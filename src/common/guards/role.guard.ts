import { RoleName } from './../../modules/user/domain/entities/role.entity';
import { ROLE_KEY } from './../decorators/role.decorator';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private _reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this._reflector.getAllAndOverride<RoleName[]>(
      ROLE_KEY,
      [context.getHandler(), context.getClass()],
    );
    
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest<{ user: UserEntity }>();
    
    if (!user) throw new NotFoundException();

    // Check if user has super-admin or dev role
    // const isSuperAdminOrDev = user.roles?.some((value) => ['super-admin', 'dev'].includes(value.name));
    // if (isSuperAdminOrDev) return true;
    
    return requiredRoles.some((role) => user.roles?.some((value) => value.name === role));
  }
}