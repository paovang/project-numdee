import {
    Permission,
    PermissionType,
  } from '../../../../domain/entities/permission.entity';
  
  export const userManagemenGroups = [
    {
      id: 1,
      name: Permission.ReadUsers,
      description: 'read user data',
      type: PermissionType.UserManagement,
      display_name: 'ອ່ານຂໍ້ມູນຜູ້ໃຊ້',
    },
    {
      id: 2,
      name: Permission.CreateUsers,
      description: 'create user data',
      type: PermissionType.UserManagement,
      display_name: 'ເພີ່ມຂໍ້ມູນຜູ້ໃຊ້',
    },
    {
      id: 3,
      name: Permission.UpdateUsers,
      description: 'update user data',
      type: PermissionType.UserManagement,
      display_name: 'ອັບເດດຂໍ້ມູນຜູ້ໃຊ້',
    },
    {
      id: 4,
      name: Permission.DeleteUsers,
      description: 'delete user data',
      type: PermissionType.UserManagement,
      display_name: 'ລົບຂໍ້ມູນຜູ້ໃຊ້',
    }
];  