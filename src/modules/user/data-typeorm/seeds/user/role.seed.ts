import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { PermissionModel } from '../../models/permission.model';
import { RoleModel } from '../../models/role.model';

export default class RoleSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(RoleModel);
    const perimssions = await dataSource.getRepository(PermissionModel).find();

    const datas = [
      {
        id: 1,
        name: 'super-admin',
        description: 'this is super admin'
      },
      {
        id: 2,
        name: 'dev',
        description: 'this is super developer'
      },
      {
        id: 3,
        name: 'customer',
        description: 'this is customer'
      },
      {
        id: 4,
        name: 'admin',
        description: 'this is admin'
      },
    ];

    await repository.save(
      datas.map((data) => {
        const model = new RoleModel();
        model.id = data.id;
        model.name = data.name;
        model.description = data.description;
        if (data.id === 4) {
          model.permissions = perimssions;
        }
        return model;
      }),
    );
  }
}