import { RoleName } from '@/modules/user/domain/entities/role.entity';
import { SetMetadata } from '@nestjs/common';

export const ROLE_KEY = Symbol('ROLE_KEY');
export const Roles = (...roles: RoleName[]) => SetMetadata(ROLE_KEY, roles);