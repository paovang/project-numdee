import { Permission } from '@/modules/user/domain/entities/permission.entity';
import { SetMetadata } from '@nestjs/common';

export const PERMISSION_KEY = Symbol('PERMISSION_KEY');
export const Permissions = (...permissions: Permission[]) => SetMetadata(PERMISSION_KEY, permissions);