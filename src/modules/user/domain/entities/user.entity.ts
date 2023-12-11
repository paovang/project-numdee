import { RoleEntity } from './role.entity';

export class UserEntity {
  id: number;

  username?: string;

  email?: string;

  phone?: string;

  notificationTopic?: string;

  password: string;

  isActive = true;

  verifyAt?: Date;

  roles: RoleEntity[];

  createdAt: Date;

  updatedAt: Date;

  deletedAt?: Date;
}