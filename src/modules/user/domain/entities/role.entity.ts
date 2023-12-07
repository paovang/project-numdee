import { PermissionEntity } from './permission.entity';
import { UserEntity } from './user.entity';

export type RoleName = 'super-admin' | 'dev' | 'customer' | string;

export class RoleEntity {
  id: number;

  name: RoleName;

  description?: string;

  isDefault: boolean;

  users: UserEntity[];

  permissions: PermissionEntity[];

  createdAt: Date;

  updatedAt: Date;

  deletedAt?: Date;
}