import { hashPassword } from '@/common/utils/password';
import { CreateUserDto } from './../../dtos/user/create.dto';
import { RoleModel } from './../models/role.model';
import { UserModel } from './../models/user.model';
import { DatabaseConnection } from '@/common/configurations/typeorm.config';
import { DataSource, In } from 'typeorm';
import { IWriteUserRepository } from '../../domain/repositories/user.interface';
import { Injectable, InternalServerErrorException, Provider } from '@nestjs/common';
import { WRITE_USER_REPOSITORY } from './inject-key';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class WriteUserTypeOrmRepository implements IWriteUserRepository
{
    constructor(
        @InjectDataSource(DatabaseConnection.Main)
        private _dataSource: DataSource
    ) {}

    async create(input: CreateUserDto): Promise<UserModel> {
        let res: UserModel;

        const queryRunner = this._dataSource.createQueryRunner();
        await queryRunner.startTransaction();

        try {
            const model = new UserModel();
            model.username = input.username;
            model.email = input.email;
            model.password = await hashPassword(input.password)
            
            const roles = await queryRunner.manager.find(RoleModel, { where: { id: In(input.roleIds) } });
            model.roles = roles;

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

    async update(id: number, input: CreateUserDto): Promise<UserModel> {
        let res: UserModel;

        const queryRunner = this._dataSource.createQueryRunner();
        await queryRunner.startTransaction();

        try {
            const model = await queryRunner.manager.findOne(UserModel, { where: { id } });
            model.username = input.username;
            model.email = input.email;

            const newRoles = await queryRunner.manager.find(RoleModel, { where: { id: In(input.roleIds) } });
            model.roles = newRoles;

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

    async delete(id: number): Promise<UserModel> {
        const res = await this._dataSource
            .getRepository(UserModel)
            .softRemove({ id });

        return res;
    }

    async test(input: any): Promise<any> {
        return 'dfgdf';
    }
}

export const writeUserTypeOrmRepositoryProvider: Provider = {
    provide: WRITE_USER_REPOSITORY,
    useClass: WriteUserTypeOrmRepository,
};