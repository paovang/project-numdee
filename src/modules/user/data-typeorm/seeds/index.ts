import PermissionSeeder from "./user/permission.seed";
import RoleSeeder from "./user/role.seed";
import UserSeeder from "./user/user-seed";

export const userSeeders = [
    PermissionSeeder,
    RoleSeeder,
    UserSeeder
];