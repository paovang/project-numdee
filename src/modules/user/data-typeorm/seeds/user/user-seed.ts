import { RoleModel } from './../../models/role.model';
import { UserModel } from '../../models/user.model';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { hash } from 'bcrypt';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
  ): Promise<any> {
    const usersRepository = dataSource.getRepository(UserModel);
    const rolesRepository = dataSource.getRepository(RoleModel);
    const role1 = await rolesRepository.findOneBy({ id: 1 });
    const role2 = await rolesRepository.findOneBy({ id: 2 });
    const role4 = await rolesRepository.findOneBy({ id: 4 });


    const user = new UserModel();
    user.username = 'alex';
    user.email = 'alex_vang@gmail.com';
    user.password = await hash('123456', 10);
    user.roles = [role1, role2, role4];

    const user1 = new UserModel();
    user1.username = 'test';
    user1.email = 'user@gmail.com';
    user1.password = await hash('123456', 10);
    user1.roles = [role4];
    
    const newUser = await usersRepository.save([user, user1]);
  }
}