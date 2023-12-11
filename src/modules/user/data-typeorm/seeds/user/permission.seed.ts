import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { PermissionModel } from '../../models/permission.model';
import { permissionDatas } from './permission-data';

export default class PermissionSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(PermissionModel);

    await repository.save(
      permissionDatas.map((data) => {
        const model = new PermissionModel();
        model.id = data.id;
        model.name = data.name;
        model.description = data.description;
        model.type = data.type;
        model.display_name = data.display_name;
        
        return model;
      }),
    );
  }
}