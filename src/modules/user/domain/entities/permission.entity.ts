import { RoleEntity } from './role.entity';

export enum Permission {
    ReadUsers = 'read_users',
    CreateUsers = 'create_users',
    UpdateUsers = 'update_users',
    DeleteUsers = 'delete_users',
}

export enum PermissionType {
    UserManagement = 'user management'
}

export class PermissionEntity {
    id: number;
  
    name: Permission;
  
    description?: string;
  
    type: PermissionType;
  
    displayName: string;
  
    roles: RoleEntity[];
  
    createdAt: Date;
  
    updatedAt: Date;
  
    deletedAt?: Date;
}