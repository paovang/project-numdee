import { TokenPayload } from '@/common/interfaces/token-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { PermissionModel } from './../models/permission.model';
import { RoleModel } from './../models/role.model';
import { hash } from 'bcrypt';
import { UserModel } from './../models/user.model';
import { DatabaseConnection } from '@/common/configurations/typeorm.config';
import { DataSource } from 'typeorm';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { IWriteUserRepository } from '../../domain/repositories/user.interface';
import { Injectable, InternalServerErrorException, Provider } from '@nestjs/common';
import { WRITE_USER_REPOSITORY } from './inject-key';
import { InjectDataSource } from '@nestjs/typeorm';
import { camelToSnakeCase } from '@/common/utils/mapper';

@Injectable()
export class WriteUserTypeOrmRepository implements IWriteUserRepository
{
    constructor(
        @InjectDataSource(DatabaseConnection.Main)
        private _dataSource: DataSource
    ) {}

    async create(input: any): Promise<any> {
        let res: UserModel;

        const queryRunner = this._dataSource.createQueryRunner();
        await queryRunner.startTransaction();

        try {
            const model = new UserModel();
            model.username = input.username;
            model.email = input.email;
            model.password = await hash(input.password, 10);
            
            const roles = await queryRunner.manager.findByIds(RoleModel, input.roleIds);
            const permissions = await queryRunner.manager.findByIds(PermissionModel, input.permissionIds);
            roles.forEach(role => {
                role.permissions = permissions;
            });
            const saveRoles = await queryRunner.manager.save<RoleModel>(roles);

            model.roles = saveRoles;
            res = await queryRunner.manager.save<UserModel>(model);
           
            await queryRunner.commitTransaction();
        } catch (error: unknown) {
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException(error);
        } finally {
            await queryRunner.release();
        }

        return res;
    }

    async getOne(id: number): Promise<UserModel> {
        const user = await this._dataSource
            .getRepository(UserModel)
            .findOne({ where: { id }, relations: ['roles', 'roles.permissions'] });

        return user;
    }

    async findUserName(username: string): Promise<UserModel> {
        const value = camelToSnakeCase(username);

        const res = await this._dataSource
        .getRepository(UserModel)
        .createQueryBuilder('users')
        .where(`users.username = :username`, { username: value })
        .getOne();

        return res;
    }
}

export const writeUserTypeOrmRepositoryProvider: Provider = {
    provide: WRITE_USER_REPOSITORY,
    useClass: WriteUserTypeOrmRepository,
};