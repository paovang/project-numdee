import { Permission } from '@/modules/user/domain/entities/permission.entity';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from '../decorators/permission.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private _reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this._reflector.getAllAndOverride<Permission[]>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );
      
    if (!requiredPermissions) return true;

    const { user } = context.switchToHttp().getRequest<{ user: UserEntity }>();
    
    if (!user) throw new NotFoundException();
    
    if (
      user.roles.some((role) => role.name === 'super-admin') ||
      user.roles.some((role) => role.name === 'dev')
    )
    return true;

    return requiredPermissions.some((permission) =>
      user.roles?.some((role) =>
        role.permissions.some((per) => per.name === permission),
      )
    );
  }
}